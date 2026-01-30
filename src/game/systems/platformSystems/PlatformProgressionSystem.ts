import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';
import { computeNextPosition } from './PlatformPositioner';
import type { IPlatform } from '@/game/queries/Platform/IPlatform';

const PLATFORM_SIZE = PlatformFactory.getPlatformSize();
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

          const updatedPlatforms = state.entities.filter(isPlatform);
          const frontPlatform = this.getHighestIndexPlatform(updatedPlatforms);
          if (frontPlatform) {
            const positions = updatedPlatforms.map(p => p.position);
            const newPos = computeNextPosition(frontPlatform.position, positions);
            const newPlatform = PlatformFactory.create(state.ui.nextPlatformIndex, newPos);
            frontPlatform.nextPlatformId = newPlatform.id;
            state.entities.push(newPlatform);
            state.ui.nextPlatformIndex++;
          }
        }
      }
      state.ui.highestPlatformReached = highestReached;
    }
  }

  private getHighestIndexPlatform(platforms: IPlatform[]): IPlatform | undefined {
    return platforms.reduce((max, p) => (p.platformIndex > (max?.platformIndex ?? -1) ? p : max), platforms[0]);
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
}
