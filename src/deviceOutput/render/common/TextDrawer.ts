import { Vector2 } from "@/math/Vector2";

export class TextDrawer {
  static draw(
    ctx: CanvasRenderingContext2D,
    text: string,
    vector: Vector2,
    color?: string,
    font?: string
  ) {
    ctx.save();
    ctx.font = font ?? '16px sans-serif';
    ctx.fillStyle = color ?? '#fff';
    ctx.fillText(text, vector.x, vector.y);
    ctx.restore();
  }
}
