import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import { isRenderable } from "../../../../game/queries/Renderable/isRenderable";
import type { IRenderable } from "../../../../game/queries/Renderable/IRenderable";
import type { ICameraRenderAPI } from "../../common/ICameraRenderAPI";

export class ControllerTestPlayerRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    const renderables = state.entities.filter(isRenderable) as IRenderable[];
    for (const obj of renderables) {
        draw.drawPolygon(obj);
    }
  }
}
