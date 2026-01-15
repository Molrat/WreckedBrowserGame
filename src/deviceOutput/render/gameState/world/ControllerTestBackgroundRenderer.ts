import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import type { IRenderAPI } from "../../common/IRenderAPI";

export class ControllerTestBackgroundRenderer implements IRenderer {
  constructor(private draw: IRenderAPI) {}

  render(state: GameState): void {
    if (state.ui.openMenu !== 'controllerTest') return;
    const { draw } = this;
    draw.clear();
    draw.fillBackground('#0b0b0f');
    const grid = 40;
    draw.lineStrokeVerticalGrid(grid, 'rgba(255,255,255,0.06)', 1);
    draw.lineStrokeHorizontalGrid(grid, 'rgba(255,255,255,0.06)', 1);
  }
}
