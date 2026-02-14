import type { Vector2 } from '@/math/Vector2';
import { PLATFORM_SIZE } from '@/game/config/constants';

const HALF = PLATFORM_SIZE / 2;

export function isPointOnAnyPlatform(
  point: Vector2,
  platformPositions: Vector2[]
): boolean {
  return platformPositions.some(p =>
    point.x >= p.x - HALF && point.x <= p.x + HALF &&
    point.y >= p.y - HALF && point.y <= p.y + HALF
  );
}
