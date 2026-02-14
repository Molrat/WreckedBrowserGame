import { Vector2 } from "@/math/Vector2";

type Cardinal = "above" | "below" | "left" | "right";

const D = 1 / Math.sqrt(2);

function cardinalFrom(from: Vector2, to: Vector2): Cardinal {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (Math.abs(dy) >= Math.abs(dx)) return dy < 0 ? "above" : "below";
  return dx < 0 ? "left" : "right";
}

export function getWeaponRowDirection(
  prev: Vector2,
  target: Vector2,
  next: Vector2
): Vector2 {
  const before = cardinalFrom(target, prev);
  const after = cardinalFrom(target, next);
  return directionFromCardinals(before, after);
}

function directionFromCardinals(a: Cardinal, b: Cardinal): Vector2 {
  const set = new Set([a, b]);
  if (set.has("above") && set.has("below")) return { x: 1, y: 0 };
  if (set.has("left") && set.has("right")) return { x: 0, y: 1 };
  if ((set.has("above") && set.has("right")) || (set.has("below") && set.has("left")))
    return { x: D, y: -D };
  if ((set.has("above") && set.has("left")) || (set.has("below") && set.has("right")))
    return { x: D, y: D };
  return { x: 1, y: 0 };
}
