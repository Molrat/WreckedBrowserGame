import { PLATFORM_SIZE } from '@/game/config/platformConstants';
import type { Carousel } from '@/game/state/entities/Carousel';
import type { Vector2 } from '@/math/Vector2';
import { nextId } from '@/utils/id';

const CAROUSEL_RADIUS = PLATFORM_SIZE * 0.6;
const ARM_HALF_WIDTH = 1.5;
const CAROUSEL_SPIN_RATE = 0.5; // rad/s
const CAROUSEL_COLOR = '#ff69b4';
const CAROUSEL_DEPTH = 1;

function createArm(position: Vector2, orientation: number, spawnPlatformIndex: number): Carousel {
  return {
    id: nextId(),
    position: { ...position },
    orientation,
    shape: [
      { x: -ARM_HALF_WIDTH, y: -CAROUSEL_RADIUS },
      { x: ARM_HALF_WIDTH, y: -CAROUSEL_RADIUS },
      { x: ARM_HALF_WIDTH, y: CAROUSEL_RADIUS },
      { x: -ARM_HALF_WIDTH, y: CAROUSEL_RADIUS },
    ],
    fillColor: CAROUSEL_COLOR,
    borderColor: null,
    borderWidth: null,
    depth: CAROUSEL_DEPTH,
    spawnPlatformIndex,
    carouselSpinRate: CAROUSEL_SPIN_RATE,
  };
}

export function createCarouselPair(position: Vector2, spawnPlatformIndex: number): Carousel[] {
  return [
    createArm(position, 0, spawnPlatformIndex),
    createArm(position, Math.PI / 2, spawnPlatformIndex),
  ];
}
