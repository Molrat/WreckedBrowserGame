import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { generateInitialPlatforms } from '@/game/systems/platformSystems/PlatformChainGenerator';

export class InbetweenLevelsMenuSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== 'inbetweenLevels') return;

    const players = state.entities.filter(isPlayer);
    const allPlayersReady = players.every(p => 
      p.currentGamepad.triangle && !p.previousGamepad.triangle
    );

    if (!allPlayersReady) return;

    const newPlatforms = generateInitialPlatforms();
    const firstPlatform = newPlatforms[0];

    for (const entity of state.entities) {
      if (!isPlayer(entity)) continue;
      entity.position.x = firstPlatform.position.x;
      entity.position.y = firstPlatform.position.y;
      entity.velocity.x = 0;
      entity.velocity.y = 0;
      entity.angularVelocity = 0;
      entity.orientation = 0;
      entity.health = entity.maxHealth;
      entity.placement = 0;
    }

    // Remove old platforms
    for (let i = state.entities.length - 1; i >= 0; i--) {
      if (isPlatform(state.entities[i])) {
        state.entities.splice(i, 1);
      }
    }
    
    state.entities.push(...newPlatforms);
    state.ui.openMenu = null;
    state.ui.currentRound++;
    state.ui.highestPlatformReached = 1;
    state.ui.nextPlatformIndex = 21;
  }
}
