import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isMountablePhysical } from "@/game/queries/MountablePhysical/isMountablePhysical";
import { isPlatform } from "@/game/queries/Platform/isPlatform";
import { createLaserCannon } from "@/game/state/entities/Factories/LaserCannonFactory";
import {
  WEAPON_SPAWN_INTERVAL,
  MAX_WEAPONS_ON_GROUND,
} from "@/game/config/weaponConstants";

export class WeaponSpawnSystem implements ISystem {
  private timeSinceLastSpawn = 0;

  update(state: GameState, _eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;
    
    this.timeSinceLastSpawn += dt;
    if (this.timeSinceLastSpawn < WEAPON_SPAWN_INTERVAL) return;

    const weapons = state.entities.filter(isMountablePhysical);
    const groundWeapons = weapons.filter(w => w.mountedOnPlayerId === null);
    if (groundWeapons.length >= MAX_WEAPONS_ON_GROUND) return;

    const platforms = state.entities.filter(isPlatform);
    if (platforms.length === 0) return;

      this.spawnOnPatternedPlatforms(state, platforms);
    this.timeSinceLastSpawn = 0;
  }

    private spawnOnPatternedPlatforms(
      state: GameState,
      platforms: { position: { x: number; y: number } }[]
    ): void {
      if (platforms.length < 4) return;
      const spacing = 12;
      const totalLength = spacing * 3; // 4 weapons, 3 gaps
      const offset = -totalLength / 2 + spacing / 2; // Center between 2nd and 3rd
      for (let i = 3; i < platforms.length; i += 4) {
        const platform = platforms[i];
        const prev = platforms[i - 1];
        const dx = Math.abs(platform.position.x - prev.position.x);
        const dy = Math.abs(platform.position.y - prev.position.y);
        // Alignment: true = horizontal, false = vertical
        const horizontal = dy > dx;
        for (let j = 0; j < 4; j++) {
          let pos;
          if (horizontal) {
            pos = {
              x: platform.position.x + offset + j * spacing,
              y: platform.position.y
            };
          } else {
            pos = {
              x: platform.position.x,
              y: platform.position.y + offset + j * spacing
            };
          }
          state.entities.push(createLaserCannon(pos));
        }
      }
    }
}
