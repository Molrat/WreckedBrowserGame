import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { IPlayer } from "@/game/queries/Player/IPlayer";
import { isWeapon } from "@/game/queries/Weapon/isWeapon";
import { IWeapon } from "@/game/queries/Weapon/IWeapon";
import { Identifiable } from "@/game/state/components/Identifiable";
import { IProjectileFactory } from "../../../state/entities/Factories/ProjectileFactories/IProjectileFactory";
import { rotate, add } from "@/math/Vector2";
import { canFireSingleShot } from "./canFireSingleShot";
import { canFireAutomatic } from "./canFireAutomatic";

export class AmmoBasedFireSystem implements ISystem {
  constructor(private projectileFactory: IProjectileFactory) {}

  update(state: GameState, eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;
    const players = state.entities.filter(isPlayer);
    const weapons = state.entities.filter(isWeapon);

    this.tickCooldowns(weapons, dt);

    for (const player of players) {
      const weapon = this.findMountedWeapon(weapons, player.id);
      if (!weapon) continue;
      if (!this.shouldFire(player, weapon)) continue;
      this.fireWeapon(state, eventBus, player, weapon);
    }
  }

  private tickCooldowns(weapons: (Identifiable & IWeapon)[], dt: number): void {
    for (const w of weapons) {
      if (w.fireCooldown > 0) w.fireCooldown = Math.max(0, w.fireCooldown - dt);
    }
  }

  private shouldFire(player: IPlayer, weapon: Identifiable & IWeapon): boolean {
    if (weapon.fireCooldown > 0) return false;
    if (weapon.fireRate === null) return canFireSingleShot(player);
    return canFireAutomatic(player);
  }

  private findMountedWeapon(
    weapons: (Identifiable & IWeapon)[],
    playerId: string
  ): (Identifiable & IWeapon) | undefined {
    return weapons.find(
      w => w.mountedOnPlayerId === playerId && w.currentAmmo > 0
    );
  }

  private fireWeapon(
    state: GameState,
    eventBus: EventBus,
    player: IPlayer,
    weapon: Identifiable & IWeapon
  ): void {
    const origin = add(
      player.position,
      rotate(weapon.relativePosition, player.orientation)
    );
    const projectile = this.projectileFactory.create(
      weapon.projectileType, origin, weapon.orientation, player.id, player.velocity, state.time.total
    );
    state.entities.push(projectile);
    eventBus.emit({
      type: 'ProjectileFired',
      projectileType: weapon.projectileType,
      position: { x: origin.x, y: origin.y },
    });
    weapon.currentAmmo -= 1;
    if (weapon.fireRate !== null) {
      weapon.fireCooldown = 1 / weapon.fireRate;
    }
    if (weapon.currentAmmo < 1) {
      state.entities = state.entities.filter(e => e.id !== weapon.id);
      eventBus.emit({
      type: 'OutOfAmmo',
      position: { x: origin.x, y: origin.y },
      color: player.fillColor ?? '#ff8800',
    });
    }
    
  }
}
