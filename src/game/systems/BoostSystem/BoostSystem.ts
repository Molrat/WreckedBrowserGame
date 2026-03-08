import type { GameState } from '@/game/state/GameState';
import type { EventBus } from '@/game/events/EventBus';
import type { ISystem } from '@/game/systems/ISystem';
import { isBoostable } from '@/game/queries/Boostable/isBoostable';
import { applyBoost } from './applyBoost';

export class BoostSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;

    for (const e of state.entities.filter(isBoostable)) {
      e.boostCooldown = Math.max(0, e.boostCooldown - dt);
      if (e.boostCooldown > 0) continue;
      applyBoost(e);
    }
  }
}
