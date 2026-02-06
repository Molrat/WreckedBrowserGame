import { Vector2, dotProduct, normalize, perpendicular, scale, add } from "../Vector2";

export function projectPolygonOnAxis(vertices: Vector2[], axis: Vector2): { min: number; max: number } {
  let min = dotProduct(vertices[0], axis);
  let max = min;
  for (let i = 1; i < vertices.length; i++) {
    const proj = dotProduct(vertices[i], axis);
    if (proj < min) min = proj;
    if (proj > max) max = proj;
  }
  return { min, max };
}

export function getPolygonAxes(vertices: Vector2[]): Vector2[] {
  const axes: Vector2[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const p1 = vertices[i];
    const p2 = vertices[(i + 1) % vertices.length];
    const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
    axes.push(normalize(perpendicular(edge)));
  }
  return axes;
}

export function getPolygonCenter(vertices: Vector2[]): Vector2 {
  let cx = 0, cy = 0;
  for (const v of vertices) { cx += v.x; cy += v.y; }
  return { x: cx / vertices.length, y: cy / vertices.length };
}
