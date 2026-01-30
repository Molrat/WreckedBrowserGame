import type { Vector2 } from '@/math/Vector2';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';

const PLATFORM_SIZE = PlatformFactory.getPlatformSize();
const MIN_ADJACENCY = PLATFORM_SIZE / 2;
const MAX_ATTEMPTS = 20;

type Direction = 'right' | 'left' | 'up' | 'down';

const DIRECTIONS: Direction[] = ['right', 'left', 'up', 'down'];

const directionVectors: Record<Direction, Vector2> = {
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
};

export function computeNextPosition(frontPos: Vector2, existingPositions: Vector2[]): Vector2 {
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidate = generateAdjacentCandidate(frontPos);
    if (!hasOverlapWithAny(candidate, existingPositions)) {
      return candidate;
    }
  }
  // Place anyway after max attempts
  return generateAdjacentCandidate(frontPos);
}

function generateAdjacentCandidate(frontPos: Vector2): Vector2 {
  const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
  const vec = directionVectors[dir];
  const maxSlide = PLATFORM_SIZE - MIN_ADJACENCY;
  const slide = (Math.random() * 2 - 1) * maxSlide;

  if (vec.x !== 0) {
    return { x: frontPos.x + vec.x * PLATFORM_SIZE, y: frontPos.y + slide };
  } else {
    return { x: frontPos.x + slide, y: frontPos.y + vec.y * PLATFORM_SIZE };
  }
}

function hasOverlapWithAny(candidate: Vector2, others: Vector2[]): boolean {
  return others.some(other => hasOverlap(candidate, other));
}

function hasOverlap(a: Vector2, b: Vector2): boolean {
  const half = PLATFORM_SIZE / 2;
  const overlapX = Math.min(a.x + half, b.x + half) - Math.max(a.x - half, b.x - half);
  const overlapY = Math.min(a.y + half, b.y + half) - Math.max(a.y - half, b.y - half);
  return overlapX > 0 && overlapY > 0;
}
