export class RectDrawer {
  static fill(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    alpha?: number
  ) {
    ctx.save();
    if (alpha !== undefined) ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
  }

  static stroke(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    lineWidth: number
  ) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  }

  static strokeAlpha(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    lineWidth: number,
    alpha: number
  ) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.strokeRect(x, y, width, height);
    ctx.restore();
  }
}
