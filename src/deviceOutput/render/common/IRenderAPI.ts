import type { IRenderable } from "../../../game/queries/Renderable/IRenderable";
import type { Camera } from "../../../game/state/components/camera/Camera";

export interface IRenderAPI {
  setCamera(cam: Camera): void;
  clearCamera(): void;
  clear(): void;
  fillBackground(color: string): void;

  width(): number;
  height(): number;

  rectFill(x: number, y: number, w: number, h: number, color: string, alpha?: number): void;
  rectStroke(x: number, y: number, w: number, h: number, color: string, lineWidth: number): void;
  rectStrokeAlpha(x: number, y: number, w: number, h: number, color: string, lineWidth: number, alpha: number): void;

  lineStrokeVerticalGrid(step: number, strokeStyle?: string, lineWidth?: number): void;
  lineStrokeHorizontalGrid(step: number, strokeStyle?: string, lineWidth?: number): void;
  lineStroke(x1: number, y1: number, x2: number, y2: number, strokeStyle?: string, lineWidth?: number): void;

  polygonDrawPhysical(obj: IRenderable): void;

  textDraw(text: string, x: number, y: number, color?: string, font?: string): void;
  textDrawCenteredOnCanvas(text: string, y: number, color?: string, font?: string): void;
}
