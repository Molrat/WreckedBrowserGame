import { IInputInjector } from '@/deviceInput/IInputInjector';
import { GameState } from '@/game/state/GameState';

export class AspectRatioInjector implements IInputInjector {
  injectInputIntoState(state: GameState): void {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    state.aspectRatio = w / h;
  }
}
