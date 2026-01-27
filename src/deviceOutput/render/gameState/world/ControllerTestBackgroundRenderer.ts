import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import type { ICameraRenderAPI } from "../../common/ICameraRenderAPI";

export class ControllerTestBackgroundRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (! (state.ui.openMenu == 'controllerTest' || state.ui.openMenu == null)) return;
    draw.clear();
    draw.fillBackground('#0b0b0f');
    const gridSpacing = 40;
    draw.drawGrid(gridSpacing, 'rgba(255,255,255,0.06)', 1);
  }
}
