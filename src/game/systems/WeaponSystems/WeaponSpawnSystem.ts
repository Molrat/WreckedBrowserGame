import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isMountablePhysical } from "@/game/queries/MountablePhysical/isMountablePhysical";
import { isPlatform } from "@/game/queries/Platform/isPlatform";
import { createLaserCannon } from "@/game/state/entities/weapons/laserCannon/LaserCannonFactory";
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

    this.spawnOnRandomPlatform(state, platforms);
    this.timeSinceLastSpawn = 0;
  }

  private spawnOnRandomPlatform(
    state: GameState,
    platforms: { position: { x: number; y: number } }[]
  ): void {
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const offset = { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 };
    const pos = {
      x: platform.position.x + offset.x,
      y: platform.position.y + offset.y,
    };
    state.entities.push(createLaserCannon(pos));
  }
}
