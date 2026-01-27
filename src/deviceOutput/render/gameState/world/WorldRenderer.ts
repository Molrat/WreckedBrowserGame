import type { GameState } from '@/game/state/GameState';
import { IRenderer } from '@/deviceOutput/render/IRenderer';
import type { ICameraRenderAPI } from '@/deviceOutput/render/common/ICameraRenderAPI';

export class WorldRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI) {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    draw.setCamera(state.camera);
    // draw world entities here via polygonDrawPhysical etc
  }
}
