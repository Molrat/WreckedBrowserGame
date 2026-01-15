import { Vector2 } from "../../../math/Vector2";
import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import { getTrianglePoints, transformPoints } from "../../../math/triangles";

export class PolygonDrawer {
  static fill(ctx: CanvasRenderingContext2D, points: Vector2[], fillStyle?: string) {
    if (points.length === 0) return;
    ctx.save();
    if (fillStyle) ctx.fillStyle = fillStyle;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  static stroke(ctx: CanvasRenderingContext2D, points: Vector2[], strokeStyle?: string, lineWidth?: number) {
    if (points.length === 0) return;
    ctx.save();
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

  static drawPhysical(ctx: CanvasRenderingContext2D, obj: IRenderable) {
    ctx.save();

    if (obj.color) {
      ctx.fillStyle = obj.color;
    }

    switch (obj.shape.type) {
      case 'rect': {
        const { width, height } = obj.shape;
        ctx.fillRect(
          obj.position.x - width / 2,
          obj.position.y - height / 2,
          width,
          height
        );
        break;
      }

      case 'circle': {
        const { radius } = obj.shape;
        ctx.beginPath();
        ctx.arc(
          obj.position.x,
          obj.position.y,
          radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
        break;
      }

      case 'triangle': {
        const { base, height} = obj.shape;
        const pts = getTrianglePoints(base, height);
        const worldPts = transformPoints(
          pts,
          obj.orientation,
          obj.position
        );
        this.fill(ctx, worldPts);
        break;
      }

      case 'polygon': {
        const { points } = obj.shape;
        const worldPts = transformPoints(
          points,
          obj.orientation,
          obj.position
        );
        this.fill(ctx, worldPts);
        break;
      }
    }

    ctx.restore();
  }
}