import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { Vector2 } from "../../../math/Vector2";
import type { Camera } from "../../../game/state/components/camera/Camera";

// input is in world coordinates (meters), rendering API handles conversion to screen pixels
export interface ICameraRenderAPI {
  beginFrame(cam: Camera): void;
  clear(): void;
  fillBackground(color: string): void;

  getWidth(): number;
  getHeight(): number;

  drawGrid(step: number, strokeStyle?: string, lineWidth?: number): void;
  drawLine(point1: Vector2, point2: Vector2, strokeStyle?: string, lineWidth?: number): void;
  drawLineSequence(points: Vector2[], strokeStyle: string, lineWidth: number, usePixelCoords: boolean): void;
  drawArrow(point1: Vector2, point2: Vector2, color?: string, lineWidth?: number): void;
  drawPolygon(obj: IRenderable): void;
  drawText(text: string, position: Vector2, color?: string, font?: string): void;
  drawWorldText(text: string, position: Vector2, sizeMeters: number, color?: string): void;
}
