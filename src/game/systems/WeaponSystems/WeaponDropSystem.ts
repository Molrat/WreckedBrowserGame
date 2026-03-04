import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { IPlayer } from "@/game/queries/Player/IPlayer";
import { isWeapon } from "@/game/queries/Weapon/isWeapon";
import { IWeapon } from "@/game/queries/Weapon/IWeapon";
import { Identifiable } from "@/game/state/components/Identifiable";
import { add, rotate } from "@/math/Vector2";

export class WeaponDropSystem implements ISystem {
  update(state: GameState, eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    const players = state.entities.filter(isPlayer);
    const weapons = state.entities.filter(isWeapon);

    for (const player of players) {
      if (!this.justPressedTriangle(player)) continue;
      const mounted = weapons.find(w => w.mountedOnPlayerId === player.id);
      if (!mounted) continue;
      this.dropWeapon(state, eventBus, mounted, player);
    }
  }

  private justPressedTriangle(player: IPlayer): boolean {
    return player.currentGamepad.triangle && !player.previousGamepad.triangle;
  }

  private dropWeapon(
    state: GameState,
    eventBus: EventBus,
    weapon: Identifiable & IWeapon,
    player: IPlayer
  ): void {
      state.entities = state.entities.filter(e => e.id !== weapon.id);
      const origin = add(
            player.position,
            rotate(weapon.relativePosition, player.orientation)
          );
      eventBus.emit({
      type: 'OutOfAmmo',
      position: origin,
      color: player.fillColor ?? '#ff8800'
      });
  }
}
