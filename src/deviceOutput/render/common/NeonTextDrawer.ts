import type { IScreenRenderAPI } from "./IScreenRenderAPI";

export class NeonTextDrawer {
    /**
     * Draws text with neon glow effect using triple-layer shadow blur
     * @param draw - Screen render API
     * @param text - Text to draw
     * @param x - X coordinate (center)
     * @param y - Y coordinate (center)
     * @param blurColor - Neon color (used for glow)
     * @param font - CSS font string
     * @param outerBlur - Outer glow blur (default: 15)
     * @param middleBlur - Middle glow blur (default: 10)
     * @param innerBlur - Inner glow blur (default: 5)
     */
    static drawNeonText(
        draw: IScreenRenderAPI,
        text: string,
        x: number,
        y: number,
        fontColor: string,
        blurColor: string,
        font: string,
        outerBlur: number = 15,
        middleBlur: number = 10,
        innerBlur: number = 5
    ): void {
        const ctx = (draw as any).ctx as CanvasRenderingContext2D;

        ctx.save();
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Outer glow
        ctx.shadowBlur = outerBlur;
        ctx.shadowColor = blurColor;
        ctx.fillStyle = blurColor;
        ctx.fillText(text, x, y);

        // Middle glow
        ctx.shadowBlur = middleBlur;
        ctx.fillText(text, x, y);

        // Inner bright core
        ctx.shadowBlur = innerBlur;
        ctx.fillStyle = fontColor;
        ctx.fillText(text, x, y);

        ctx.restore();
    }
}
