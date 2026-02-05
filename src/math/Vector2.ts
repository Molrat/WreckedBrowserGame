export type Vector2 = { x: number; y: number };

export function add(a: Vector2, b: Vector2): Vector2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function scale(v: Vector2, s: number): Vector2 {
  return { x: v.x * s, y: v.y * s };
}

export function length(v: Vector2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function rotate(v: Vector2, angle: number): Vector2 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: v.x * cos - v.y * sin, y: v.x * sin + v.y * cos };
}

export function normalize(v: Vector2): Vector2 {
  const len = length(v);
  return len === 0 ? { x: 0, y: 0 } : scale(v, 1 / len);
}

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