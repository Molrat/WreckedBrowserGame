import { IScreenRenderer } from "@/deviceoutput/graphics/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceoutput/graphics/common/IScreenRenderAPI";
import { NeonTextDrawer } from "@/deviceoutput/graphics/common/NeonTextDrawer";

export class RoundWonRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (!gameState.ui.roundWon) return;

    const cx = draw.getWidth() / 2;
    const cy = draw.getHeight() / 2;
    const text = `Player ${gameState.ui.roundWon.winnerName} Won!`;
    const color = gameState.ui.roundWon.winnerColor;

    NeonTextDrawer.drawNeonText(
      draw, text, cx, cy,
      color, '#ffffff',
      'bold 72px Arial, sans-serif',
    );
  }
}
