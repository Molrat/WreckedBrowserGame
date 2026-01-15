export class TextDrawer {
  static draw(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    color?: string,
    font?: string
  ) {
    ctx.save();
    if (font) ctx.font = font;
    if (color) ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  static drawCenteredOnCanvas(
    ctx: CanvasRenderingContext2D,
    text: string,
    y: number,
    color?: string,
    font?: string
  ) {
    ctx.save();
    if (font) ctx.font = font;
    const width = ctx.canvas.width;
    const textWidth = ctx.measureText(text).width;
    if (color) ctx.fillStyle = color;
    ctx.fillText(text, (width - textWidth) / 2, y);
    ctx.restore();
  }
}
