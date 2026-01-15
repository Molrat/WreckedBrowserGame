export class LineDrawer {
  static strokeVerticalGrid(
    ctx: CanvasRenderingContext2D,
    step: number,
    strokeStyle?: string,
    lineWidth?: number
  ) {
    const { width, height } = ctx.canvas;
    ctx.save();
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let x = 0; x <= width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();
    ctx.restore();
  }

  static strokeHorizontalGrid(
    ctx: CanvasRenderingContext2D,
    step: number,
    strokeStyle?: string,
    lineWidth?: number
  ) {
    const { width, height } = ctx.canvas;
    ctx.save();
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    for (let y = 0; y <= height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();
    ctx.restore();
  }

  static strokeLine(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    strokeStyle?: string,
    lineWidth?: number
  ) {
    ctx.save();
    if (strokeStyle) ctx.strokeStyle = strokeStyle;
    if (lineWidth !== undefined) ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }
}
