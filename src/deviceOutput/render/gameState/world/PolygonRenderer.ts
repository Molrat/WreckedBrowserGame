import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import { isRenderable } from "../../../../game/queries/Renderable/isRenderable";
import type { IRenderable } from "../../../../game/queries/Renderable/IRenderable";
import type { ICameraRenderAPI } from "../../common/ICameraRenderAPI";

export class PolygonRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    const renderables = state.entities.filter(isRenderable) as IRenderable[];
    const sorted = renderables.slice().sort((a, b) => a.depth - b.depth);
    for (const obj of sorted) {
        draw.drawPolygon(obj);
    }
  }
}
