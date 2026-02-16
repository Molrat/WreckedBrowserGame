import { CanvasDrawer } from "./CanvasDrawer";
import { LineDrawer } from "./LineDrawer";
import { PixelPolygon, PolygonDrawer } from "./PolygonDrawer";
import { TextDrawer } from "./TextDrawer";
import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { ICameraRenderAPI as ICameraRenderAPI } from "./ICameraRenderAPI";
import type { Camera } from "../../../game/state/components/camera/Camera";
import { Vector2 } from "@/math/Vector2";

export class CameraRenderAPI implements ICameraRenderAPI {
  private camera: Camera;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.camera = { position: { x: 0, y: 0 }, width: ctx.canvas.width, height: ctx.canvas.height, velocity: { x: 0, y: 0 }, widthVelocity: 0, heightVelocity: 0 };
  }

  beginFrame(cam: Camera): void {
    this.camera = cam;
  }

  private scale(): number {
    if (!this.camera) return 1;
    return this.ctx.canvas.width / this.camera.width;
  }

  private camLeft(): number { return this.camera ? this.camera.position.x - this.camera.width / 2 : 0; }
  private camBottom(): number { return this.camera ? this.camera.position.y - this.camera.height / 2 : 0; }
  private toPixelVector(vector: Vector2): Vector2 {
    const s = this.scale()
    return {
      x: (vector.x - this.camLeft()) * s,
      y: this.ctx.canvas.height - (vector.y - this.camBottom()) * s
    }
  }

  clear(): void { CanvasDrawer.clear(this.ctx); }
  fillBackground(color: string): void { CanvasDrawer.fillBackground(this.ctx, color); }

  getWidth(): number { return this.ctx.canvas.width; }
  getHeight(): number { return this.ctx.canvas.height; }

  drawPolygon(obj: IRenderable): void {
    const worldPolygon = this.shapeToWorldPolygon(obj.shape, obj.position, obj.orientation);
    const pixelPolygon: PixelPolygon = {
      pixelPolygon: worldPolygon.map(p => this.toPixelVector(p)),
      fillColor: obj.fillColor,
      borderColor: obj.borderColor,
      borderWidth: obj.borderWidth,
    };
    PolygonDrawer.drawPolygon(this.ctx, pixelPolygon);
  }

  private shapeToWorldPolygon(shape: Vector2[], position: Vector2, orientation: number): Vector2[] {
    const cos = Math.cos(orientation);
    const sin = Math.sin(orientation);
    return shape.map(p => ({
      x: position.x + p.x * cos - p.y * sin,
      y: position.y + p.x * sin + p.y * cos,
    }));
  }

  drawText(text: string, position: Vector2, color?: string, font?: string): void {
    TextDrawer.draw(this.ctx, text, this.toPixelVector(position), color, font);
  }

  drawWorldText(text: string, position: Vector2, sizeMeters: number, color?: string): void {
    const pixelSize = Math.round(sizeMeters * this.scale());
    const font = `bold ${pixelSize}px Arial`;
    TextDrawer.draw(this.ctx, text, this.toPixelVector(position), color, font);
  }

  drawLine(point1: Vector2, point2: Vector2, strokeStyle?: string, lineWidth?: number): void {
    LineDrawer.strokeLine(this.ctx, this.toPixelVector(point1), this.toPixelVector(point2), strokeStyle, lineWidth);
  }

  drawArrow(point1: Vector2, point2: Vector2, color?: string, lineWidth?: number): void {
    const p1 = this.toPixelVector(point1);
    const p2 = this.toPixelVector(point2);
    LineDrawer.drawArrow(this.ctx, p1, p2, color, lineWidth);
  }

  drawLineSequence(points: Vector2[], strokeStyle: string, lineWidth: number, usePixelCoords: boolean = false): void {
    const pixelPoints = usePixelCoords ? points : points.map(p => this.toPixelVector(p));
    LineDrawer.strokeLineSequence(this.ctx, pixelPoints, strokeStyle, lineWidth);
  }

  drawGrid(stepMeters: number, strokeStyle?: string, lineWidth?: number): void {
    const s = this.scale();
    const stepPixels = stepMeters * s;
    const camLeft = this.camLeft();
    const camBottom = this.camBottom();
    
    // Calculate offset so grid lines align with world coordinates
    const offsetX = ((-camLeft % stepMeters) + stepMeters) % stepMeters * s;
    const offsetY = ((-camBottom % stepMeters) + stepMeters) % stepMeters * s;
    
    LineDrawer.drawGridWithOffset(this.ctx, stepPixels, offsetX, offsetY, strokeStyle, lineWidth);
  }
}
