import { Vector2, rotate, add } from "../Vector2";

export function transformPolygonToWorld(localVertices: Vector2[], position: Vector2, orientation: number): Vector2[] {
  return localVertices.map(v => {
    const rotated = rotate(v, orientation);
    return add(rotated, position);
  });
}
