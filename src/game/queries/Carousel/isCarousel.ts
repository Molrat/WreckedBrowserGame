import type { ICarousel } from './ICarousel';

export function isCarousel(e: unknown): e is ICarousel {
  return (
    typeof e === 'object' &&
    e !== null &&
    'id' in e &&
    'carouselSpinRate' in e &&
    'spawnPlatformIndex' in e &&
    'shape' in e &&
    'position' in e
  );
}
