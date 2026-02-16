import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";

export class CountdownRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    const cd = gameState.ui.countdown;
    if (!cd) return;

    const step = Math.ceil(cd.timeRemaining);
    const text = step > 0 ? `${step}` : 'GO!';
    const color = step > 0 ? '#ffffff' : '#22c55e';
    const font = step > 0 ? 'bold 120px Arial, sans-serif' : 'bold 100px Arial, sans-serif';

    const cx = draw.getWidth() / 2;
    const cy = draw.getHeight() / 2;
    draw.drawCenteredText(text, { x: cx, y: cy }, color, font);
  }
}
