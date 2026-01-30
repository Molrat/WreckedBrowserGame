import { Vector2 } from "@/math/Vector2";

export const direction = (angle: number): Vector2 => ({
  x: Math.cos(angle),
  y: Math.sin(angle),
});

export const perpendicular = (v: Vector2): Vector2 => ({
  x: -v.y,
  y: v.x,
});

export const dotProduct = (a: Vector2, b: Vector2): number =>
  a.x * b.x + a.y * b.y;
