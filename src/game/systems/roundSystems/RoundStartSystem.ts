import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { generateInitialPlatforms } from '@/game/systems/platformSystems/PlatformChainGenerator';

export class RoundStartSystem implements ISystem {
  private wasMenuOpen = true;

  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    const isMenuOpen = state.ui.openMenu !== null;
    const menuJustClosed = this.wasMenuOpen && !isMenuOpen;
    this.wasMenuOpen = isMenuOpen;

    if (!menuJustClosed) return;

    const platforms = state.entities.filter(isPlatform);
    if (platforms.length === 0) {
      const newPlatforms = generateInitialPlatforms();
      const firstPlatform = newPlatforms[0];
      
      for (const entity of state.entities) {
        if (!isPlayer(entity)) continue;
        entity.position.x = firstPlatform.position.x;
        entity.position.y = firstPlatform.position.y;
        entity.velocity.x = 0;
        entity.velocity.y = 0;
        entity.health = entity.maxHealth;
        entity.placement = 0;
      }

      state.entities.push(...newPlatforms);
      state.ui.highestPlatformReached = 1;
      state.ui.nextPlatformIndex = 21;
    }
  }
}
