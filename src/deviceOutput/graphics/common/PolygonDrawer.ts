import { Vector2 } from "../../../math/Vector2";

export interface PixelPolygon {
  pixelPolygon: Vector2[];
  fillColor: string | null;
  borderColor: string | null;
  borderWidth: number | null;
}

export class PolygonDrawer {
  static drawPolygon(ctx: CanvasRenderingContext2D, params: PixelPolygon): void {
    const { pixelPolygon, fillColor, borderColor, borderWidth } = params;
    if (pixelPolygon.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(pixelPolygon[0].x, pixelPolygon[0].y);
    for (let i = 1; i < pixelPolygon.length; i++) {
      ctx.lineTo(pixelPolygon[i].x, pixelPolygon[i].y);
    }
    ctx.closePath();

    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    if (borderColor && borderWidth) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
    }
  }
}