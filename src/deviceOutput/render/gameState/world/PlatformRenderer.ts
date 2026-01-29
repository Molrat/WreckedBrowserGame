import { IRenderer } from "@/deviceOutput/render/IRenderer";
import type { GameState } from "@/game/state/GameState";
import type { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";

export class PlatformRenderer implements IRenderer {
  render(gameState: GameState, draw: ICameraRenderAPI): void {
    if (gameState.ui.openMenu !== null) return;

    for (const platform of gameState.platforms) {
      draw.drawPolygon(platform);

      // Draw platform number at center
      draw.drawText(
        `${platform.platformIndex}`,
        platform.position,
        '#ffffff',
        'bold 14px Arial'
      );
    }
  }
}
