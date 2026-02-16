import { ISystem } from '@/game/systems/ISystem';
import { GameState } from '@/game/state/GameState';
import { EventBus } from '@/game/events/EventBus';
import { isHomingProjectile } from '@/game/queries/HomingProjectile/isHomingProjectile';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { subtract, normalize, scale, dotProduct, angleToUnitVector, length, perpendicular, velocityToAngle, add } from '@/math/Vector2';
import { estimateInterceptTime } from '@/math/estimateInterceptTime';
import { MISSILE_HOMING_FORCE, MISSILE_HOMING_RANGE, MISSILE_HOMING_FOV, MISSILE_THRUST_FORCE } from '@/game/config/weaponConstants';
import { IHomingProjectile } from '@/game/queries/HomingProjectile/IHomingProjectile';
import { Identifiable } from '@/game/state/components/Identifiable';
import { Positionable } from '@/game/state/components/Positionable';
import { Movable } from '@/game/state/components/Movable';

export class HomingMissileSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    const missiles = state.entities.filter(isHomingProjectile);
    const players = state.entities.filter(isPlayer);

    for (const missile of missiles) {
      missile.orientation = velocityToAngle(missile.velocity);
      this.applyThrust(missile);
      const target = this.findTarget(missile, players);
      if (!target) continue;
      this.steerToward(missile, target);
    }
  }

  private findTarget(
    missile: Identifiable & IHomingProjectile,
    players: (Identifiable & Positionable & Movable)[]
  ): (Identifiable & Positionable & Movable) | undefined {
    const forward = angleToUnitVector(missile.orientation);
    let bestDist = MISSILE_HOMING_RANGE;
    let bestTarget: (Identifiable & Positionable & Movable) | undefined;

    for (const player of players) {
      if (player.id === missile.ownerPlayerId) continue;
      const toTarget = subtract(player.position, missile.position);
      const dist = length(toTarget);
      if (dist > MISSILE_HOMING_RANGE || dist < 0.01) continue;
      const dir = normalize(toTarget);
      const dot = dotProduct(forward, dir);
      if (dot < Math.cos(MISSILE_HOMING_FOV / 2)) continue;
      if (dist < bestDist) {
        bestDist = dist;
        bestTarget = player;
      }
    }
    return bestTarget;
  }

  private applyThrust(missile: Identifiable & IHomingProjectile): void {
    const forward = angleToUnitVector(missile.orientation);
    const thrust = scale(forward, MISSILE_THRUST_FORCE);
    missile.forces.push({ force: thrust, localContactPoint: { x: 0, y: 0 } });
  }

  private steerToward(
    missile: Identifiable & IHomingProjectile,
    target: Positionable & Movable
  ): void {
    const toTarget = subtract(target.position, missile.position);
    const dist = length(toTarget);
    if (dist < 0.01) return;

    const dir = normalize(toTarget);
    const missileSpeed = length(missile.velocity);
    const targetRecession = dotProduct(target.velocity, dir);
    const accel = MISSILE_THRUST_FORCE / missile.mass;
    const t = estimateInterceptTime(dist, targetRecession, missileSpeed, accel);

    const predictedPos = add(target.position, scale(target.velocity, t));
    const toPredicted = normalize(subtract(predictedPos, missile.position));
    const forward = angleToUnitVector(missile.orientation);
    const sideways = perpendicular(forward);
    const lateralComponent = dotProduct(toPredicted, sideways);
    const steerForce = scale(sideways, lateralComponent * MISSILE_HOMING_FORCE);
    missile.forces.push({ force: steerForce, localContactPoint: { x: 0, y: 0 } });
  }
}
