import type { GameState } from '../../game/state/GameState';
import { IInputInjector } from '../IInputInjector';
import type { IGamepadProvider } from './controllerProviders/IGamepadProvider';

export class ControllersInjector implements IInputInjector{
  constructor(private gamepads: IGamepadProvider) {}

  injectInputIntoState(state: GameState): void {
      const controllers = this.gamepads.getGamepads();
      state.input.gamePads = controllers;
  }
}
