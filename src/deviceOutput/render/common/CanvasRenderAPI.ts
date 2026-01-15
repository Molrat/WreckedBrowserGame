import { CanvasDrawer } from "./CanvasDrawer";
import { RectDrawer } from "./RectDrawer";
import { LineDrawer } from "./LineDrawer";
import { PolygonDrawer } from "./PolygonDrawer";
import { TextDrawer } from "./TextDrawer";
import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { IRenderAPI } from "./IRenderAPI";

export class CanvasRenderAPI implements IRenderAPI {
  constructor(private ctx: CanvasRenderingContext2D) {}

  clear(): void { CanvasDrawer.clear(this.ctx); }
  fillBackground(color: string): void { CanvasDrawer.fillBackground(this.ctx, color); }

  width(): number { return this.ctx.canvas.width; }
  height(): number { return this.ctx.canvas.height; }

  rectFill(x: number, y: number, w: number, h: number, color: string, alpha?: number): void {
    RectDrawer.fill(this.ctx, x, y, w, h, color, alpha);
  }
  rectStroke(x: number, y: number, w: number, h: number, color: string, lineWidth: number): void {
    RectDrawer.stroke(this.ctx, x, y, w, h, color, lineWidth);
  }
  rectStrokeAlpha(x: number, y: number, w: number, h: number, color: string, lineWidth: number, alpha: number): void {
    RectDrawer.strokeAlpha(this.ctx, x, y, w, h, color, lineWidth, alpha);
  }

  lineStrokeVerticalGrid(step: number, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.strokeVerticalGrid(this.ctx, step, strokeStyle, lineWidth);
  }
  lineStrokeHorizontalGrid(step: number, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.strokeHorizontalGrid(this.ctx, step, strokeStyle, lineWidth);
  }
  lineStroke(x1: number, y1: number, x2: number, y2: number, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.strokeLine(this.ctx, x1, y1, x2, y2, strokeStyle, lineWidth);
  }

  polygonDrawPhysical(obj: IRenderable): void { PolygonDrawer.drawPhysical(this.ctx, obj); }

  textDraw(text: string, x: number, y: number, color?: string, font?: string): void {
    TextDrawer.draw(this.ctx, text, x, y, color, font);
  }
  textDrawCenteredOnCanvas(text: string, y: number, color?: string, font?: string): void {
    TextDrawer.drawCenteredOnCanvas(this.ctx, text, y, color, font);
  }
}
