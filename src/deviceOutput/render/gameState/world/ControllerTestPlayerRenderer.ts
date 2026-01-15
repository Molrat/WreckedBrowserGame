import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import { isRenderable } from "../../../../game/queries/Renderable/isRenderable";
import type { IRenderable } from "../../../../game/queries/Renderable/IRenderable";
import type { IRenderAPI } from "../../common/IRenderAPI";

export class ControllerTestPlayerRenderer implements IRenderer {
  constructor(private draw: IRenderAPI) {}

  render(state: GameState): void {
    if (state.ui.openMenu !== 'controllerTest') return;
    const { draw } = this;
    const renderables = state.entities.filter(isRenderable) as IRenderable[];
    for (const r of renderables) {
      draw.polygonDrawPhysical(r);
    }
  }
}
