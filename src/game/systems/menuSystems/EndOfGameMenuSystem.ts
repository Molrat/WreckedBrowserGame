import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { StateInitializer } from '@/game/state/StateInitializer';

export class EndOfGameMenuSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== 'endOfGame') return;

    const players = state.entities.filter(isPlayer);
    const allPlayersReady = players.every(p => 
      p.currentGamepad.triangle && !p.previousGamepad.triangle
    );

    if (!allPlayersReady) return;

    const freshState = StateInitializer.createInitialGameState();
    
    state.entities.length = 0;
    Object.assign(state.ui, freshState.ui);
    state.time.total = 0;
    Object.assign(state.camera, freshState.camera);
  }
}
