import type { Platform } from '@/game/state/entities/Platform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';

const PLATFORM_COUNT = 20;
const PLATFORM_SIZE = PlatformFactory.getPlatformSize();
const GAP_SIZE = 2; // meters between platforms

// Directions: 0=right, 1=up, 2=left, 3=down (but we exclude going back)
type Direction = 0 | 1 | 2 | 3;

const directionVectors: Record<Direction, { x: number; y: number }> = {
  0: { x: 1, y: 0 },  // right
  1: { x: 0, y: 1 },  // up
  2: { x: -1, y: 0 }, // left
  3: { x: 0, y: -1 }, // down
};

const oppositeDirection: Record<Direction, Direction> = {
  0: 2,
  1: 3,
  2: 0,
  3: 1,
};

export function generatePlatformChain(startIndex: number, count: number): Platform[] {
  const platforms: Platform[] = [];
  let currentPos = { x: 0, y: 0 };
  let lastDirection: Direction | null = null;

  for (let i = 0; i < count; i++) {
    const platformIndex = startIndex + i;
    const platform = PlatformFactory.create(platformIndex, { ...currentPos });
    platforms.push(platform);

    if (i < count - 1) {
      // Choose next direction (exclude opposite of last direction to avoid going back)
      const possibleDirections: Direction[] = [0, 1, 2, 3].filter(
        d => lastDirection === null || d !== oppositeDirection[lastDirection]
      ) as Direction[];
      
      const nextDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
      const offset = PLATFORM_SIZE + GAP_SIZE;
      
      currentPos = {
        x: currentPos.x + directionVectors[nextDirection].x * offset,
        y: currentPos.y + directionVectors[nextDirection].y * offset,
      };
      
      lastDirection = nextDirection;
    }
  }

  // Link platforms
  for (let i = 0; i < platforms.length - 1; i++) {
    platforms[i].nextPlatformId = platforms[i + 1].id;
  }

  return platforms;
}

export function generateInitialPlatforms(): Platform[] {
  return generatePlatformChain(1, PLATFORM_COUNT);
}
