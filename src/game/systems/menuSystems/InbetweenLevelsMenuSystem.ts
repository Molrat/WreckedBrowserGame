import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { generateInitialPlatforms } from '@/game/systems/platformSystems/PlatformChainGenerator';
import { isWeapon } from '@/game/queries/Weapon/isWeapon';
import { isDamagingPhysical } from '@/game/queries/DamagingPhysical/isDamagingPhysical';

export class InbetweenLevelsMenuSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== 'inbetweenLevels') return;
    const players = state.entities.filter(isPlayer);

    // Toggle ready state when triangle is pressed
    for (const player of players) {
      const justPressedTriangle = player.currentGamepad.triangle && !player.previousGamepad.triangle;
      if (justPressedTriangle) {
        player.readyForNextRound = !player.readyForNextRound;
        _eventBus.emit({ type: 'StartMenuPlayerReady', slot: 0, totalSlots: 0, soundOnly: true });

      }
    }

    const allPlayersReady = players.length > 0 && players.every(p => p.readyForNextRound);

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
      entity.readyForNextRound = false;
    }

    for (let i = state.entities.length - 1; i >= 0; i--) {
      if (isPlatform(state.entities[i]) || 
          isWeapon(state.entities[i]) || 
          isDamagingPhysical(state.entities[i])
      ) {
        state.entities.splice(i, 1);
      }
    }
    
    state.entities.push(...newPlatforms);
    state.ui.openMenu = null;
    state.ui.currentRound++;
    state.ui.highestPlatformWithSpawnedWeapon = 0;
    state.camera.position = { x: 0, y: 0 };
  }
}
