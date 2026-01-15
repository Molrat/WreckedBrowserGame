import type { GameState } from '../../state/GameState';
import type { EventBus } from '../../events/EventBus';
import { ISystem } from '../ISystem';
import { isControllable } from '../../queries/Controllable/isControllable';

export class DisconnectCheckSystem implements ISystem {
  update(state: GameState, eventBus: EventBus, dt: number): void {
    const pads = navigator.getGamepads?.() || [];
    const connectedPads = pads.filter(p => !!p).length;
    const playerCount = state.entities.filter(e => isControllable(e)).length;

    if (state.ui.openMenu !== 'start' && state.ui.openMenu !== 'reconnectControllerMenu') {
      if (playerCount > connectedPads) {
        state.ui.previousMenuBeforeDisconnect = state.ui.openMenu;
        state.ui.openMenu = 'reconnectControllerMenu';
      }
    } else if (state.ui.openMenu === 'reconnectControllerMenu') {
      if (playerCount <= connectedPads) {
        state.ui.openMenu = state.ui.previousMenuBeforeDisconnect;
        state.ui.previousMenuBeforeDisconnect = null;
      }
    }
  }
}
