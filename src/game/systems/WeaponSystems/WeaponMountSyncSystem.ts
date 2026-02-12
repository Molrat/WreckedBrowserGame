import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isMountablePhysical } from "@/game/queries/MountablePhysical/isMountablePhysical";
import { IMountablePhysical } from "@/game/queries/MountablePhysical/IMountablePhysical";
import { rotate, add } from "@/math/Vector2";
import { Identifiable } from "@/game/state/components/Identifiable";
import { Positionable } from "@/game/state/components/Positionable";

export class WeaponMountSyncSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    const weapons = state.entities.filter(isMountablePhysical);
    for (const weapon of weapons) {
      if (weapon.mountedOnPlayerId === null) continue;
      const owner = this.findOwner(state, weapon.mountedOnPlayerId);
      if (!owner) continue;
      this.syncPosition(weapon, owner);
    }
  }

  private findOwner(
    state: GameState,
    playerId: string
  ): (Identifiable & Positionable) | undefined {
    return state.entities.find(
      (e): e is Identifiable & Positionable =>
        e.id === playerId && 'position' in e && 'orientation' in e
    );
  }

  private syncPosition(
    weapon: IMountablePhysical,
    owner: Positionable
  ): void {
    const worldOffset = rotate(weapon.relativePosition, owner.orientation);
    const worldPos = add(owner.position, worldOffset);
    weapon.position.x = worldPos.x;
    weapon.position.y = worldPos.y;
    weapon.orientation = owner.orientation + weapon.relativeOrientation;
  }
}
