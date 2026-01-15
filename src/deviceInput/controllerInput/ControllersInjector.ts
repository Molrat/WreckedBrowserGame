import type { GameState } from '@/game/state/GameState';
import { IInputInjector } from '@/deviceInput/IInputInjector';
import type { IGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/IGamepadProvider';

export class ControllersInjector implements IInputInjector{
  constructor(private gamepads: IGamepadProvider) {}

  injectInputIntoState(state: GameState): void {
      const controllers = this.gamepads.getGamepads();
      state.input.gamePads = controllers;
  }
}
