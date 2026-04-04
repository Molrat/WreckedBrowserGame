import type { ISystem } from '@/game/systems/ISystem';
import type { GameState } from '@/game/state/GameState';
import type { EventBus } from '@/game/events/EventBus';
import { isCarousel } from '@/game/queries/Carousel/isCarousel';

export class CarouselRotationSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, dt: number): void {
    for (const e of state.entities) {
      if (!isCarousel(e)) continue;
      e.orientation += e.carouselSpinRate * dt;
    }
  }
}
