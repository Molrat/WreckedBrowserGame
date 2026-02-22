import type { GameState } from '@/game/state/GameState';
import { IRenderer } from '@/deviceOutput/graphics/IRenderer';
import type { ICameraRenderAPI } from '@/deviceOutput/graphics/common/ICameraRenderAPI';

export class WorldRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI) {
    if (!(state.ui.openMenu === null)) return;
    draw.beginFrame(state.camera);
    // draw world entities here via polygonDrawPhysical etc
  }
}
