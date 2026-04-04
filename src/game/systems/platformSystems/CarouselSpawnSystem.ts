import type { ISystem } from '@/game/systems/ISystem';
import type { GameState } from '@/game/state/GameState';
import type { EventBus } from '@/game/events/EventBus';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import type { IPlatform } from '@/game/queries/Platform/IPlatform';
import { isCarousel } from '@/game/queries/Carousel/isCarousel';
import { createCarouselPair } from '@/game/state/entities/Factories/CarouselFactory';

const CAROUSEL_SPAWN_PROBABILITY = 0.1;

export class CarouselSpawnSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;
    if (!state.settings.carouselEnabled) return;

    const platforms = state.entities.filter(isPlatform);
    this.spawnNewCarousels(state, platforms);
    this.destroyOrphanedCarousels(state, platforms);
  }

  private spawnNewCarousels(state: GameState, platforms: IPlatform[]): void {
    const highestDecided = state.ui.highestPlatformWithCarouselDecision;
    const newPlatforms = platforms
      .filter(p => p.platformIndex > highestDecided)
      .sort((a, b) => a.platformIndex - b.platformIndex);

    for (const platform of newPlatforms) {
      if (Math.random() < CAROUSEL_SPAWN_PROBABILITY) {
        state.entities.push(...createCarouselPair(platform.position, platform.platformIndex));
      }
      state.ui.highestPlatformWithCarouselDecision = platform.platformIndex;
    }
  }

  private destroyOrphanedCarousels(state: GameState, platforms: IPlatform[]): void {
    const platformIndices = new Set(platforms.map(p => p.platformIndex));
    state.entities = state.entities.filter(e => {
      if (!isCarousel(e)) return true;
      return platformIndices.has(e.spawnPlatformIndex);
    });
  }
}
