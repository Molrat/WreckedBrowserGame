import type { Platform } from '@/game/state/entities/Platform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';
import { computeNextPosition } from './PlatformPositioner';
import { NR_OF_PLATFORMS } from '@/game/config/constants';

export function generatePlatformChain(startIndex: number, count: number): Platform[] {
  const platforms: Platform[] = [];
  const positions: { x: number; y: number }[] = [];
  let currentPos = { x: 0, y: 0 };

  for (let i = 0; i < count; i++) {
    const platformIndex = startIndex + i;
    const platform = PlatformFactory.create(platformIndex, { ...currentPos });
    platforms.push(platform);
    positions.push({ ...currentPos });

    if (i < count - 1) {
      currentPos = computeNextPosition(currentPos, positions);
    }
  }

  // Link platforms
  for (let i = 0; i < platforms.length - 1; i++) {
    platforms[i].nextPlatformId = platforms[i + 1].id;
  }

  return platforms;
}

export function generateInitialPlatforms(): Platform[] {
  return generatePlatformChain(1, NR_OF_PLATFORMS);
}
