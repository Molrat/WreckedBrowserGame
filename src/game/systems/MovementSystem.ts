import type { GameState } from '@/game/state/GameState';
import { isAcceleratable } from '@/game/queries/Acceleratable/isAcceleratable';
import { ISystem } from '@/game/systems/ISystem';
import { EventBus } from '@/game/events/EventBus';

export class MovementSystem implements ISystem {
  update(state: GameState, eventBus: EventBus, dt: number) {
    const movableEntities = state.entities.filter(isAcceleratable);
    for (const e of movableEntities) {
        e.velocity.x += e.acceleration.x * dt;
        e.velocity.y += e.acceleration.y * dt;
        e.position.x += e.velocity.x * dt;
        e.position.y += e.velocity.y * dt;
    }
  }
}
