import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';

const PLATFORM_SIZE = PlatformFactory.getPlatformSize();
const GAP_SIZE = 2;
const PROGRESSION_THRESHOLD = 10;

export class PlatformProgressionSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    
    const platforms = state.entities.filter(isPlatform);
    if (platforms.length === 0) return;

    const players = state.entities.filter(isPlayer);
    let highestReached = state.ui.highestPlatformReached;

    for (const player of players) {
      if (player.health <= 0) continue;
      for (const platform of platforms) {
        if (this.isOnPlatform(player.position, platform.position)) {
          if (platform.platformIndex > highestReached) {
            highestReached = platform.platformIndex;
          }
        }
      }
    }

    if (highestReached > state.ui.highestPlatformReached) {
      const oldHighest = state.ui.highestPlatformReached;
      for (let i = oldHighest + 1; i <= highestReached; i++) {
        if (i >= PROGRESSION_THRESHOLD) {
          const platformToRemove = i - PROGRESSION_THRESHOLD + 1;
          const idx = state.entities.findIndex(e => isPlatform(e) && e.platformIndex === platformToRemove);
          if (idx !== -1) state.entities.splice(idx, 1);

          const lastPlatform = platforms[platforms.length - 1];
          if (lastPlatform) {
            const newPlatform = this.createNextPlatform(lastPlatform, state.ui.nextPlatformIndex);
            lastPlatform.nextPlatformId = newPlatform.id;
            state.entities.push(newPlatform);
            state.ui.nextPlatformIndex++;
          }
        }
      }
      state.ui.highestPlatformReached = highestReached;
    }
  }

  private isOnPlatform(playerPos: { x: number; y: number }, platformPos: { x: number; y: number }): boolean {
    const halfSize = PLATFORM_SIZE / 2;
    return (
      playerPos.x >= platformPos.x - halfSize &&
      playerPos.x <= platformPos.x + halfSize &&
      playerPos.y >= platformPos.y - halfSize &&
      playerPos.y <= platformPos.y + halfSize
    );
  }

  private createNextPlatform(lastPlatform: { position: { x: number; y: number }; platformIndex: number }, newIndex: number) {
    // Choose random direction for next platform
    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
    ];
    const dir = directions[Math.floor(Math.random() * directions.length)];
    const offset = PLATFORM_SIZE + GAP_SIZE;
    
    return PlatformFactory.create(newIndex, {
      x: lastPlatform.position.x + dir.x * offset,
      y: lastPlatform.position.y + dir.y * offset,
    });
  }
}
