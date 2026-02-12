import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { IPlayer } from "@/game/queries/Player/IPlayer";
import { isArmedWeapon } from "@/game/queries/ArmedWeapon/isArmedWeapon";
import { IArmedWeapon } from "@/game/queries/ArmedWeapon/IArmedWeapon";
import { Identifiable } from "@/game/state/components/Identifiable";
import { IProjectileFactory } from "./IProjectileFactory";
import { rotate, add } from "@/math/Vector2";

export class AmmoBasedFireSystem implements ISystem {
  constructor(private projectileFactory: IProjectileFactory) {}

  update(state: GameState, eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    const players = state.entities.filter(isPlayer);
    const weapons = state.entities.filter(isArmedWeapon);

    for (const player of players) {
      if (!this.justPressedFire(player)) continue;
      const weapon = this.findMountedWeapon(weapons, player.id);
      if (!weapon) continue;
      this.fireWeapon(state, eventBus, player, weapon);
    }
  }

  private justPressedFire(player: IPlayer): boolean {
    return player.currentGamepad.cross && !player.previousGamepad.cross;
  }

  private findMountedWeapon(
    weapons: (Identifiable & IArmedWeapon)[],
    playerId: string
  ): (Identifiable & IArmedWeapon) | undefined {
    return weapons.find(
      w => w.mountedOnPlayerId === playerId && w.currentAmmo > 0
    );
  }

  private fireWeapon(
    state: GameState,
    eventBus: EventBus,
    player: IPlayer,
    weapon: Identifiable & IArmedWeapon
  ): void {
    const origin = add(
      player.position,
      rotate(weapon.relativePosition, player.orientation)
    );
    const projectile = this.projectileFactory.create(
      weapon.projectileType, origin, player.orientation, player.id, player.velocity
    );
    state.entities.push(projectile);
    weapon.currentAmmo -= 1;
    if (weapon.currentAmmo < 1) {
      state.entities = state.entities.filter(e => e.id !== weapon.id);
    }
    eventBus.emit({
      type: 'WeaponFired',
      position: { x: origin.x, y: origin.y },
      color: player.fillColor ?? '#ff8800',
    });
  }
}
