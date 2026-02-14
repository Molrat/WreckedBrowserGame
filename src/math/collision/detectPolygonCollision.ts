import { Vector2, dotProduct, scale, add } from "../Vector2";
import { CollisionManifold } from "./CollisionManifold";
import { projectPolygonOnAxis, getPolygonAxes, getPolygonCenter } from "./polygonProjection";

export function detectPolygonCollision(verticesA: Vector2[], verticesB: Vector2[]): CollisionManifold | null {
  const axesA = getPolygonAxes(verticesA);
  const axesB = getPolygonAxes(verticesB);
  const axes = [...axesA, ...axesB];

  let minOverlap = Infinity;
  let smallestAxis: Vector2 = { x: 1, y: 0 };

  for (const axis of axes) {
    const projA = projectPolygonOnAxis(verticesA, axis);
    const projB = projectPolygonOnAxis(verticesB, axis);
    const overlap = Math.min(projA.max - projB.min, projB.max - projA.min);
    if (overlap <= 0) return null;
    if (overlap < minOverlap) {
      minOverlap = overlap;
      smallestAxis = axis;
    }
  }

  const centerA = getPolygonCenter(verticesA);
  const centerB = getPolygonCenter(verticesB);
  const direction = { x: centerB.x - centerA.x, y: centerB.y - centerA.y };
  if (dotProduct(direction, smallestAxis) < 0) {
    smallestAxis = scale(smallestAxis, -1);
  }

  const contactPoint = findContactPoint(verticesA, verticesB, smallestAxis);
  return { contactPoint, normal: smallestAxis, penetration: minOverlap };
}

function findContactPoint(verticesA: Vector2[], verticesB: Vector2[], normal: Vector2): Vector2 {
  const intersections = findEdgeIntersections(verticesA, verticesB);
  if (intersections.length > 0) {
    const sum = intersections.reduce(
      (acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }),
      { x: 0, y: 0 }
    );
    return { x: sum.x / intersections.length, y: sum.y / intersections.length };
  }
  // Fallback: one polygon fully inside the other
  const supportA = findSupportPoint(verticesA, normal);
  const supportB = findSupportPoint(verticesB, scale(normal, -1));
  return { x: (supportA.x + supportB.x) / 2, y: (supportA.y + supportB.y) / 2 };
}

function findEdgeIntersections(verticesA: Vector2[], verticesB: Vector2[]): Vector2[] {
  const points: Vector2[] = [];
  for (let i = 0; i < verticesA.length; i++) {
    const a1 = verticesA[i];
    const a2 = verticesA[(i + 1) % verticesA.length];
    for (let j = 0; j < verticesB.length; j++) {
      const b1 = verticesB[j];
      const b2 = verticesB[(j + 1) % verticesB.length];
      const pt = segmentIntersection(a1, a2, b1, b2);
      if (pt) points.push(pt);
    }
  }
  return points;
}

function segmentIntersection(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2): Vector2 | null {
  const d1x = p2.x - p1.x, d1y = p2.y - p1.y;
  const d2x = p4.x - p3.x, d2y = p4.y - p3.y;
  const denom = d1x * d2y - d1y * d2x;
  if (Math.abs(denom) < 1e-10) return null;
  const t = ((p3.x - p1.x) * d2y - (p3.y - p1.y) * d2x) / denom;
  const u = ((p3.x - p1.x) * d1y - (p3.y - p1.y) * d1x) / denom;
  if (t < 0 || t > 1 || u < 0 || u > 1) return null;
  return { x: p1.x + t * d1x, y: p1.y + t * d1y };
}

function findSupportPoint(vertices: Vector2[], direction: Vector2): Vector2 {
  let best = vertices[0];
  let bestDot = dotProduct(vertices[0], direction);
  for (let i = 1; i < vertices.length; i++) {
    const d = dotProduct(vertices[i], direction);
    if (d > bestDot) { bestDot = d; best = vertices[i]; }
  }
  return best;
}
