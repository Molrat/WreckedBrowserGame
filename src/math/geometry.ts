import { Vector2 } from "./Vector2";

export function getTrianglePoints(base: number, height: number): Vector2[] {
  return [
    { x: -base / 2, y: height / 2 },
    { x: base / 2, y: height / 2 },
    { x: 0, y: -height / 2 },
  ];
}

export function transformPoints(points: Vector2[], angle: number, translate: Vector2): Vector2[] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return points.map(p => ({
    x: p.x * cos - p.y * sin + translate.x,
    y: p.x * sin + p.y * cos + translate.y,
  }));
}