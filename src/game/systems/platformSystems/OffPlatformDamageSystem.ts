import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { isPointOnAnyPlatform } from './isPointOnAnyPlatform';
import { getWheelWorldPositions } from './getWheelWorldPositions';

const DAMAGE_PER_SECOND = 100000; // Instant death when off platform

export class OffPlatformDamageSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;

    const platforms = state.entities.filter(isPlatform);
    if (platforms.length === 0) return;
    const platPositions = platforms.map(p => p.position);

    for (const entity of state.entities) {
      if (!isPlayer(entity)) continue;
      if (entity.health <= 0) continue;

      const wheels = getWheelWorldPositions(
        entity.position, entity.orientation,
        entity.lengthToFrontAxle, entity.lengthToRearAxle, entity.trackHalfWidth
      );
      const wheelsOff = wheels.filter(w => !isPointOnAnyPlatform(w, platPositions)).length;
      const centerOff = !isPointOnAnyPlatform(entity.position, platPositions);

      if (wheelsOff >= 2 && centerOff) {
        entity.health = Math.max(0, entity.health - DAMAGE_PER_SECOND * dt);
      }
    }
  }
}
