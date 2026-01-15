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