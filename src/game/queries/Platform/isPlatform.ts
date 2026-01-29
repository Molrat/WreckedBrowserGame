import type { IPlatform } from './IPlatform';

export function isPlatform(e: unknown): e is IPlatform {
  return (
    typeof e === 'object' &&
    e !== null &&
    'id' in e &&
    'platformIndex' in e &&
    'nextPlatformId' in e &&
    'position' in e &&
    'shape' in e
  );
}
