import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isMountablePhysical } from "@/game/queries/MountablePhysical/isMountablePhysical";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { IPlayer } from "@/game/queries/Player/IPlayer";
import { IMountablePhysical } from "@/game/queries/MountablePhysical/IMountablePhysical";
import { Identifiable } from "@/game/state/components/Identifiable";
import { detectPolygonCollision } from "@/math/collision/detectPolygonCollision";
import { transformPolygonToWorld } from "@/math/collision/transformPolygon";

export class WeaponPickupSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    const weapons = state.entities.filter(isMountablePhysical);
    const players = state.entities.filter(isPlayer);
    const groundWeapons = weapons.filter(w => w.mountedOnPlayerId === null);

    for (const player of players) {
      if (this.playerHasWeapon(weapons, player.id)) continue;
      this.tryPickup(groundWeapons, player);
    }
  }

  private playerHasWeapon(
    weapons: (Identifiable & IMountablePhysical)[],
    playerId: string
  ): boolean {
    return weapons.some(w => w.mountedOnPlayerId === playerId);
  }

  private tryPickup(
    groundWeapons: (Identifiable & IMountablePhysical)[],
    player: IPlayer
  ): void {
    const playerPoly = transformPolygonToWorld(
      player.shape, player.position, player.orientation
    );
    for (const weapon of groundWeapons) {
      const weaponPoly = transformPolygonToWorld(
        weapon.shape, weapon.position, weapon.orientation
      );
      if (detectPolygonCollision(playerPoly, weaponPoly)) {
        weapon.mountedOnPlayerId = player.id;
        return;
      }
    }
  }
}
