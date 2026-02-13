import { Vector2 } from "./Vector2";

export type BoundingBox = {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
};

export function computeBoundingBox(points: Vector2[], aspectRatio: number): BoundingBox {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  let width = maxX - minX;
  let height = maxY - minY;
  const ar = aspectRatio || 1;
  const boxAR = width / (height || 1);
  if (boxAR < ar) { width = height * ar; }
  else { height = width / ar; }
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    width,
    height,
  };
}
