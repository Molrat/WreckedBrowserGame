import { CanvasDrawer } from "./CanvasDrawer";
import { RectDrawer } from "./RectDrawer";
import { LineDrawer } from "./LineDrawer";
import { PolygonDrawer } from "./PolygonDrawer";
import { TextDrawer } from "./TextDrawer";
import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { IRenderAPI } from "./IRenderAPI";
import type { Camera } from "../../../game/state/components/camera/Camera";

export class CanvasRenderAPI implements IRenderAPI {
  private camera: Camera | null = null;
  constructor(private ctx: CanvasRenderingContext2D) {}

  setCamera(cam: Camera): void { this.camera = cam; }
  clearCamera(): void { this.camera = null; }

  private scale(): number {
    if (!this.camera) return 1;
    return this.ctx.canvas.width / this.camera.width;
  }
  private camLeft(): number { return this.camera ? this.camera.position.x - this.camera.width / 2 : 0; }
  private camTop(): number { return this.camera ? this.camera.position.y - this.camera.height / 2 : 0; }
  private toPxX(x: number): number { const s = this.scale(); return (x - this.camLeft()) * s; }
  private toPxY(y: number): number { const s = this.scale(); return (y - this.camTop()) * s; }
  private toPxLen(v: number): number { return v * this.scale(); }

  clear(): void { CanvasDrawer.clear(this.ctx); }
  fillBackground(color: string): void { CanvasDrawer.fillBackground(this.ctx, color); }

  width(): number { return this.ctx.canvas.width; }
  height(): number { return this.ctx.canvas.height; }

  rectFill(x: number, y: number, w: number, h: number, color: string, alpha?: number): void {
    RectDrawer.fill(this.ctx, this.toPxX(x), this.toPxY(y), this.toPxLen(w), this.toPxLen(h), color, alpha);
  }
  rectStroke(x: number, y: number, w: number, h: number, color: string, lineWidth: number): void {
    RectDrawer.stroke(this.ctx, this.toPxX(x), this.toPxY(y), this.toPxLen(w), this.toPxLen(h), color, lineWidth);
  }
  rectStrokeAlpha(x: number, y: number, w: number, h: number, color: string, lineWidth: number, alpha: number): void {
    RectDrawer.strokeAlpha(this.ctx, this.toPxX(x), this.toPxY(y), this.toPxLen(w), this.toPxLen(h), color, lineWidth, alpha);
  }

  lineStrokeVerticalGrid(stepMeters: number, strokeStyle?: string, lineWidth?: number): void {
    if (this.camera) {
      const left = this.camLeft();
      const right = left + (this.camera.width);
      const top = this.camTop();
      const bottom = top + (this.camera.height);
      const startX = Math.floor(left / stepMeters) * stepMeters;
      for (let x = startX; x <= right; x += stepMeters) {
        this.lineStroke(x, top, x, bottom, strokeStyle, lineWidth);
      }
    } else {
      LineDrawer.strokeVerticalGrid(this.ctx, stepMeters, strokeStyle, lineWidth);
    }
  }
  lineStrokeHorizontalGrid(stepMeters: number, strokeStyle?: string, lineWidth?: number): void {
    if (this.camera) {
      const left = this.camLeft();
      const right = left + (this.camera.width);
      const top = this.camTop();
      const bottom = top + (this.camera.height);
      const startY = Math.floor(top / stepMeters) * stepMeters;
      for (let y = startY; y <= bottom; y += stepMeters) {
        this.lineStroke(left, y, right, y, strokeStyle, lineWidth);
      }
    } else {
      LineDrawer.strokeHorizontalGrid(this.ctx, stepMeters, strokeStyle, lineWidth);
    }
  }
  lineStroke(x1: number, y1: number, x2: number, y2: number, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.strokeLine(this.ctx, this.toPxX(x1), this.toPxY(y1), this.toPxX(x2), this.toPxY(y2), strokeStyle, lineWidth);
  }

  polygonDrawPhysical(obj: IRenderable): void {
    if (!this.camera) { PolygonDrawer.drawPhysical(this.ctx, obj); return; }
    const s = this.scale();
    this.ctx.save();
    this.ctx.setTransform(s, 0, 0, s, -this.camLeft() * s, -this.camTop() * s);
    PolygonDrawer.drawPhysical(this.ctx, obj);
    this.ctx.restore();
  }

  textDraw(text: string, x: number, y: number, color?: string, font?: string): void {
    TextDrawer.draw(this.ctx, text, this.toPxX(x), this.toPxY(y), color, font);
  }
  textDrawCenteredOnCanvas(text: string, yMeters: number, color?: string, font?: string): void {
    TextDrawer.drawCenteredOnCanvas(this.ctx, text, this.toPxY(yMeters), color, font);
  }
}
