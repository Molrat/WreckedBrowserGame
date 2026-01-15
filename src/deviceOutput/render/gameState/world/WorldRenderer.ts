import type { GameState } from '@/game/state/GameState';
import { IRenderer } from '@/deviceOutput/render/IRenderer';
import type { IRenderAPI } from '@/deviceOutput/render/common/IRenderAPI';

export class WorldRenderer implements IRenderer {
  constructor(private draw: IRenderAPI) {}

  render(state: GameState) {
    if (state.ui.openMenu !== null) return; // Only render world during gameplay
    const { draw } = this;
    draw.clear();
    draw.fillBackground('#0a0a0a');
  }
}
