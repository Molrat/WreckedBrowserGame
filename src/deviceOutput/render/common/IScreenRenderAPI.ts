import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { LinkRect } from "./LinkRect";
import type { Vector2 } from "../../../math/Vector2";

// input is in screen pixel coordinates, no camera projection
export interface IScreenRenderAPI {
  clear(): void;
  fillBackground(color: string): void;

  getWidth(): number;
  getHeight(): number;

  drawGrid(step: number, strokeStyle?: string, lineWidth?: number): void;
  drawLine(point1: Vector2, point2: Vector2, strokeStyle?: string, lineWidth?: number): void;
  drawArrow(point1: Vector2, point2: Vector2, color?: string, lineWidth?: number): void;
  drawPolygon(obj: IRenderable): void;
  drawText(text: string, position: Vector2, color?: string, font?: string): void;
  drawCenteredText(text: string, position: Vector2, color: string, font: string): void;
  drawLink(text: string, x: number, y: number, color: string, font: string): LinkRect;
}
