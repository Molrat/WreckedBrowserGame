import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";
import { NeonTextDrawer } from "@/deviceOutput/render/common/NeonTextDrawer";

export class IntroRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (gameState.ui.openMenu !== 'intro') return;

    const width = draw.getWidth();
    const height = draw.getHeight();
    draw.clear();
    draw.fillBackground('#0a0a14');

    // Title position
    const titleX = width / 2;
    const titleY = height * 0.35;

    // Draw title with neon glow effect
    const title = 'NEON-STRIKE';
    const subtitle = 'CARMAGEDDON';
    
    NeonTextDrawer.drawNeonText(draw, title, titleX, titleY, '#ffffff', '#00ffff', 'bold 80px Arial, sans-serif');
    NeonTextDrawer.drawNeonText(draw, subtitle, titleX, titleY + 90, '#ffffff', '#ff00ff',  'bold 40px Arial, sans-serif');

    // Blinking "Press any button" text
    const blinkSpeed = 2;
    const blinkValue = Math.sin(gameState.time.total * blinkSpeed);
    const showText = blinkValue > 0;

    if (showText) {
      const promptY = height * 0.75;
      NeonTextDrawer.drawNeonText(draw, 'PRESS ANY BUTTON TO CONTINUE', titleX, promptY, '#ffffff', '#ff00ff', 'bold 24px Arial, sans-serif');
    }
  }
}
