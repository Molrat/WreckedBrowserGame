import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import type { GamepadState } from '@/game/state/input/GamepadState';

export class IntroMenuSystem implements ISystem {
  private anyKeyPressed = false;
  private anyMousePressed = false;

  constructor() {
    // Listen for keyboard events
    window.addEventListener('keydown', () => {
      this.anyKeyPressed = true;
    });

    // Listen for mouse events
    window.addEventListener('mousedown', () => {
      this.anyMousePressed = true;
    });
  }

  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== 'intro') return;

    let isButtonPressed = false;

    // Check if any gamepad button was pressed
    for (let i = 0; i < state.input.gamePads.length; i++) {
      const current = state.input.gamePads[i];
      const previous = state.input.previousGamepads[i];
      
      if (this.anyControllerButtonPressed(current, previous)) {
        isButtonPressed = true;
        break;
      }
    }

    // Check if any keyboard key was pressed
    if (this.anyKeyPressed) {
      isButtonPressed = true;
    }

    // Check if any mouse button was pressed
    if (this.anyMousePressed) {
      isButtonPressed = true;
    }

    if (isButtonPressed) {
      state.ui.openMenu = 'start';
      this.anyKeyPressed = false;
      this.anyMousePressed = false;
    }
  }

  private anyControllerButtonPressed(current: GamepadState, previous?: GamepadState): boolean {
    if (!previous) return false;

    // Check all buttons
    return (
      (current.triangle && !previous.triangle) ||
      (current.cross && !previous.cross) ||
      (current.square && !previous.square) ||
      (current.circle && !previous.circle) ||
      (current.l1 && !previous.l1) ||
      (current.r1 && !previous.r1) ||
      (current.l2 && !previous.l2) ||
      (current.r2 && !previous.r2) ||
      (current.l3 && !previous.l3) ||
      (current.r3 && !previous.r3) ||
      (current.dpadUp && !previous.dpadUp) ||
      (current.dpadDown && !previous.dpadDown) ||
      (current.dpadLeft && !previous.dpadLeft) ||
      (current.dpadRight && !previous.dpadRight) ||
      (current.start && !previous.start) ||
      (current.select && !previous.select) ||
      (current.home && !previous.home)
    );
  }
}
