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
  const supportA = findSupportPoint(verticesA, normal);
  const supportB = findSupportPoint(verticesB, scale(normal, -1));
  return { x: (supportA.x + supportB.x) / 2, y: (supportA.y + supportB.y) / 2 };
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
