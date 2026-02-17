import type { LinkRect } from "./LinkRect";

export class LinkDrawer {
  static draw(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color: string,
    font: string
  ): LinkRect {
    ctx.save();
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    const textW = ctx.measureText(text).width;
    ctx.fillRect(x - textW / 2, y + 11, textW, 1.5);
    ctx.restore();
    return { x: x - textW / 2, y: y - 10, w: textW, h: 22 };
  }

  static isInside(rect: LinkRect, clickX: number, clickY: number): boolean {
    return clickX >= rect.x && clickX <= rect.x + rect.w
      && clickY >= rect.y && clickY <= rect.y + rect.h;
  }
}
