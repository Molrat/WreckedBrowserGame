import type { GameState } from '@/game/state/GameState';
import { IRenderer } from '@/deviceOutput/render/IRenderer';
import type { IRenderAPI } from '@/deviceOutput/render/common/IRenderAPI';

export class WorldRenderer implements IRenderer {
  constructor(private draw: IRenderAPI) {}

  render(state: GameState) {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    const { draw } = this;
    draw.clear();
    draw.fillBackground('#0a0a0a');
  }
}
