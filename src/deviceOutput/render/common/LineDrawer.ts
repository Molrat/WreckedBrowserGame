import { Vector2 } from "@/math/Vector2";

export class LineDrawer {

  static drawGrid(
    ctx: CanvasRenderingContext2D,
    step: number,
    strokeStyle?: string,
    lineWidth?: number
  ): void {
    this.drawGridWithOffset(ctx, step, 0, 0, strokeStyle, lineWidth);
  }

  static drawGridWithOffset(
    ctx: CanvasRenderingContext2D,
    step: number,
    offsetX: number,
    offsetY: number,
    strokeStyle?: string,
    lineWidth?: number
  ): void {
    const { width, height } = ctx.canvas;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    
    // Vertical lines
    ctx.beginPath();
    for (let x = offsetX; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();
    
    // Horizontal lines
    ctx.beginPath();
    for (let y = offsetY; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  private static strokeVerticalGrid(
    ctx: CanvasRenderingContext2D,
    step: number,
    strokeStyle?: string,
    lineWidth?: number
  ): void {
    const { width, height } = ctx.canvas;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let x = 0; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();
  }

  private static strokeHorizontalGrid(
    ctx: CanvasRenderingContext2D,
    step: number,
    strokeStyle?: string,
    lineWidth?: number
  ): void {
    const { width, height } = ctx.canvas;
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let y = 0; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
  }

  static strokeLine(
    ctx: CanvasRenderingContext2D,
    point1: Vector2,
    point2: Vector2,
    strokeStyle?: string,
    lineWidth?: number
  ): void {
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
  }

  static drawArrow(
    ctx: CanvasRenderingContext2D, 
    p1: Vector2, 
    p2: Vector2, 
    color?: string, 
    lineWidth?: number)
    : void {
    ctx.strokeStyle = color || '#f33';
    ctx.lineWidth = lineWidth ?? 2;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len, uy = dy / len;
    const ah = Math.min(12, 0.15 * len); // arrow head size
    const leftX = p2.x - ah * (ux * Math.cos(Math.PI/6) - uy * Math.sin(Math.PI/6));
    const leftY = p2.y - ah * (uy * Math.cos(Math.PI/6) + ux * Math.sin(Math.PI/6));
    const rightX = p2.x - ah * (ux * Math.cos(Math.PI/6) + uy * Math.sin(Math.PI/6));
    const rightY = p2.y - ah * (uy * Math.cos(Math.PI/6) - ux * Math.sin(Math.PI/6));
    ctx.beginPath();
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(leftX, leftY);
    ctx.moveTo(p2.x, p2.y);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();
  }
}
