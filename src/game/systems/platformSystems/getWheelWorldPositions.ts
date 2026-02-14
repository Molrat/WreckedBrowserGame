import type { Vector2 } from '@/math/Vector2';
import { rotate, add } from '@/math/Vector2';

export function getWheelWorldPositions(
  position: Vector2,
  orientation: number,
  lengthToFrontAxle: number,
  lengthToRearAxle: number,
  trackHalfWidth: number
): Vector2[] {
  return [
    toWorld({ x: lengthToFrontAxle, y: trackHalfWidth }, orientation, position),
    toWorld({ x: lengthToFrontAxle, y: -trackHalfWidth }, orientation, position),
    toWorld({ x: -lengthToRearAxle, y: trackHalfWidth }, orientation, position),
    toWorld({ x: -lengthToRearAxle, y: -trackHalfWidth }, orientation, position),
  ];
}

function toWorld(local: Vector2, orientation: number, pos: Vector2): Vector2 {
  return add(rotate(local, orientation), pos);
}
