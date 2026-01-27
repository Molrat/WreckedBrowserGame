import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";

export class ReconnectControllerRenderer implements IScreenRenderer {

  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (gameState.ui.openMenu !== 'reconnectControllerMenu') return;
    draw.clear();
    draw.fillBackground('#111');
    draw.drawText('Reconnect controller', { x: 200, y: 200 }, '#fff', '20px sans-serif');
  }
}
