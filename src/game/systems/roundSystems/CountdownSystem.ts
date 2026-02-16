import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';

const COUNTDOWN_DURATION = 3;
const GO_DISPLAY_DURATION = 0.5;

export class CountdownSystem implements ISystem {
  private wasMenuOpen = true;

  update(state: GameState, eventBus: EventBus, dt: number): void {
    const isMenuOpen = state.ui.openMenu !== null;
    const menuJustClosed = this.wasMenuOpen && !isMenuOpen;
    this.wasMenuOpen = isMenuOpen;

    if (menuJustClosed) {
      this.startCountdown(state);
    }

    this.tickCountdown(state, eventBus, dt);
  }

  private startCountdown(state: GameState): void {
    state.ui.countdown = {
      timeRemaining: COUNTDOWN_DURATION,
      lastEmittedStep: COUNTDOWN_DURATION + 1,
    };
  }

  private tickCountdown(state: GameState, eventBus: EventBus, dt: number): void {
    const cd = state.ui.countdown;
    if (!cd) return;

    cd.timeRemaining -= dt;
    const currentStep = Math.ceil(cd.timeRemaining);

    if (currentStep < cd.lastEmittedStep && currentStep >= 0) {
      cd.lastEmittedStep = currentStep;
      eventBus.emit({ type: 'CountdownTick', step: currentStep });
    }

    if (cd.timeRemaining < -GO_DISPLAY_DURATION) {
      state.ui.countdown = null;
    }
  }
}
