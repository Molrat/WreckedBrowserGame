export class CanvasDrawer {
  static clear(ctx: CanvasRenderingContext2D) {
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
  }

  static fillBackground(ctx: CanvasRenderingContext2D, color: string) {
    const { width, height } = ctx.canvas;
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}
