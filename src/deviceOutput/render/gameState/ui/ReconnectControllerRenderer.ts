import { IRenderer as IGameStateRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import type { IRenderAPI } from "../../common/IRenderAPI";

export class ReconnectControllerRenderer implements IGameStateRenderer {
  constructor(private draw: IRenderAPI) {}

  render(gameState: GameState): void {
    if (gameState.ui.openMenu !== 'reconnectControllerMenu') return;
    const { draw } = this;
    draw.clearCamera();
    const height = draw.height();
    draw.clear();
    draw.fillBackground('#111');
    draw.textDrawCenteredOnCanvas('Reconnect controller', height / 2, '#fff', '20px sans-serif');
  }
}
