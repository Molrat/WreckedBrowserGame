import { CanvasDrawer } from "./CanvasDrawer";
import { LineDrawer } from "./LineDrawer";
import { PixelPolygon, PolygonDrawer } from "./PolygonDrawer";
import { TextDrawer } from "./TextDrawer";
import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { IScreenRenderAPI } from "./IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";

export class ScreenRenderAPI implements IScreenRenderAPI {
  constructor(private ctx: CanvasRenderingContext2D) {}

  clear(): void { CanvasDrawer.clear(this.ctx); }
  fillBackground(color: string): void { CanvasDrawer.fillBackground(this.ctx, color); }

  getWidth(): number { return this.ctx.canvas.width; }
  getHeight(): number { return this.ctx.canvas.height; }

  drawPolygon(obj: IRenderable): void {
    const pixelPolygon: PixelPolygon = {
      pixelPolygon: this.shapeToAbsolutePolygon(obj.shape, obj.position, obj.orientation),
      fillColor: obj.fillColor,
      borderColor: obj.borderColor,
      borderWidth: obj.borderWidth,
    };
    PolygonDrawer.drawPolygon(this.ctx, pixelPolygon);
  }

  private shapeToAbsolutePolygon(shape: Vector2[], position: Vector2, orientation: number): Vector2[] {
    const cos = Math.cos(orientation);
    const sin = Math.sin(orientation);
    return shape.map(p => ({
      x: position.x + p.x * cos - p.y * sin,
      y: position.y + p.x * sin + p.y * cos,
    }));
  }

  drawText(text: string, position: Vector2, color?: string, font?: string): void {
    TextDrawer.draw(this.ctx, text, position, color, font);
  }

  drawLine(point1: Vector2, point2: Vector2, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.strokeLine(this.ctx, point1, point2, strokeStyle, lineWidth);
  }

  drawArrow(point1: Vector2, point2: Vector2, color?: string, lineWidth?: number): void {
    LineDrawer.drawArrow(this.ctx, point1, point2, color, lineWidth);
  }

  drawGrid(step: number, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.drawGrid(this.ctx, step, strokeStyle, lineWidth);
  }
}
