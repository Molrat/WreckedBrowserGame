import { Vector2 } from "@/math/Vector2";

export class CenteredTextDrawer {
  static draw(
    ctx: CanvasRenderingContext2D,
    text: string,
    position: Vector2,
    color: string,
    font: string
  ) {
    ctx.save();
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, position.x, position.y);
    ctx.restore();
  }
}
