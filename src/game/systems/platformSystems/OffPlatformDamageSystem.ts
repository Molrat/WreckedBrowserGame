import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';

const PLATFORM_SIZE = PlatformFactory.getPlatformSize();
const DAMAGE_PER_SECOND = 10;

export class OffPlatformDamageSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;
    
    const platforms = state.entities.filter(isPlatform);
    if (platforms.length === 0) return;

    for (const entity of state.entities) {
      if (!isPlayer(entity)) continue;
      if (entity.health <= 0) continue;

      const isOnAnyPlatform = platforms.some(platform => 
        this.isOnPlatform(entity.position, platform.position)
      );

      if (!isOnAnyPlatform) {
        entity.health = Math.max(0, entity.health - DAMAGE_PER_SECOND * dt);
      }
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
}
