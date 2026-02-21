import type { GameState } from '@/game/state/GameState';
import type { EventBus } from '@/game/events/EventBus';
import type { ISystem } from '@/game/systems/ISystem';
import { isSideBoostable } from '@/game/queries/SideBoostable/isSideBoostable';
import { applySideBoost } from './applySideBoost';

export class SideBoostSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;

    for (const e of state.entities.filter(isSideBoostable)) {
      e.sideBoostCooldown = Math.max(0, e.sideBoostCooldown - dt);
      if (e.sideBoostCooldown > 0) continue;
      applySideBoost(e);
    }
  }
}
