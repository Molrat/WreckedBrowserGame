import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isDamagingPhysical } from "@/game/queries/DamagingPhysical/isDamagingPhysical";
import { isDamageableMovable } from "@/game/queries/DamageableMovable/isDamageableMovable";
import { IDamagingPhysical } from "@/game/queries/DamagingPhysical/IDamagingPhysical";
import { IDamageableMovable } from "@/game/queries/DamageableMovable/IDamageableMovable";
import { Identifiable } from "@/game/state/components/Identifiable";
import { detectPolygonCollision } from "@/math/collision/detectPolygonCollision";
import { transformPolygonToWorld } from "@/math/collision/transformPolygon";
import { angleToUnitVector, scale, rotate, subtract, length, normalize } from "@/math/Vector2";
import { SPIN_ON_HIT_MULTIPLIER } from "@/game/config/weaponConstants";

export class DamagingCollisionSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    const damagers = state.entities.filter(isDamagingPhysical);
    const targets = state.entities.filter(isDamageableMovable);
    const toRemove: string[] = [];

    for (const dmg of damagers) {
      this.checkCollisions(_eventBus,dmg, targets, toRemove);
    }
    if (toRemove.length > 0) {
      state.entities = state.entities.filter(e => !toRemove.includes(e.id));
    }
  }

  private checkCollisions(
    eventBus: EventBus,
    damaging: Identifiable & IDamagingPhysical,
    targets: (Identifiable & IDamageableMovable)[],
    toRemove: string[]
  ): void {
    const dmgPoly = transformPolygonToWorld(damaging.shape, damaging.position, damaging.orientation);
    for (const target of targets) {
      if (damaging.ownerPlayerId === target.id) continue;
      if (damaging.id === target.id) continue;
      if (toRemove.includes(damaging.id)) return;
      const targetPoly = transformPolygonToWorld(
        target.shape, target.position, target.orientation
      );
      const manifold = detectPolygonCollision(dmgPoly, targetPoly);
      if (!manifold) continue;
      this.applyDamageAndImpulse(eventBus, damaging, target, manifold);
      if (damaging.destroyOnHit) toRemove.push(damaging.id);
    }
  }

  private applyDamageAndImpulse(
    eventBus: EventBus,
    dmg: IDamagingPhysical,
    target: IDamageableMovable,
    manifold: { contactPoint: { x: number; y: number } }
  ): void {
    target.health = Math.max(0, target.health - dmg.damage);
    const impulseDir = length(dmg.velocity) > 0.3 ? angleToUnitVector(dmg.orientation) : normalize(subtract(target.position, dmg.position));
    const impulse = scale(impulseDir, dmg.impulseMagnitude);
    const contactLocal = rotate(
      subtract(manifold.contactPoint, target.position),
      -target.orientation
    );
    const scaledContactLocal = scale(contactLocal, SPIN_ON_HIT_MULTIPLIER); // More dramatic spins!!
    target.impulses.push({ impulse, localContactPoint: scaledContactLocal });
    eventBus.emit({
      type: 'HitByProjectile',
      position: manifold.contactPoint,
      color: dmg.borderColor ?? target.borderColor ?? '#ff0000',
      damage: dmg.damage
    });
  }
}
