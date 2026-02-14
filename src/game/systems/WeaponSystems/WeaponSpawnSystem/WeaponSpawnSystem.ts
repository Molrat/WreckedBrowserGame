import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isPlatform } from "@/game/queries/Platform/isPlatform";
import { IPlatform } from "@/game/queries/Platform/IPlatform";
import { isWeapon } from "@/game/queries/Weapon/isWeapon";
import { getWeaponRowDirection } from "./getWeaponRowDirection";
import { spawnWeaponRow } from "./spawnWeaponRow";

export class WeaponSpawnSystem implements ISystem {
  
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;

    const platforms = state.entities.filter(isPlatform);
    this.spawnNewWeapons(state, platforms);
    this.destroyOrphanedWeapons(state, platforms);
  }

  private spawnNewWeapons(state: GameState, platforms: IPlatform[]): void {
    const highestSpawnedIndex = state.ui.highestPlatformWithSpawnedWeapon || 0;
    const candidates = platforms
      .filter(p => p.platformIndex > highestSpawnedIndex && p.platformIndex % 4 === 0)
      .sort((a, b) => a.platformIndex - b.platformIndex);

    for (const trigger of candidates) {
      const idx = trigger.platformIndex;
      const prev = platforms.find(p => p.platformIndex === idx - 1);
      const next = platforms.find(p => p.platformIndex === idx + 1);
      if (!prev || !next) continue;

      const dir = getWeaponRowDirection(prev.position, trigger.position, next.position);
      spawnWeaponRow(state, trigger.position, dir, idx);
      state.ui.highestPlatformWithSpawnedWeapon = idx;
    }
  }

  private destroyOrphanedWeapons(state: GameState, platforms: IPlatform[]): void {
    const platformIndices = new Set(platforms.map(p => p.platformIndex));
    state.entities = state.entities.filter(e => {
      if (!isWeapon(e)) return true;
      if (e.mountedOnPlayerId !== null) return true;
      return platformIndices.has(e.spawnPlatformIndex);
    });
  }
}
