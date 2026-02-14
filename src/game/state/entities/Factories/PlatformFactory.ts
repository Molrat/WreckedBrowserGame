import { PLATFORM_BORDER_COLOR, PLATFORM_FILL_COLOR, PLATFORM_SIZE } from '@/game/config/platformConstants';
import type { Platform } from '@/game/state/entities/Platform';
import { nextId } from '@/utils/id';


export class PlatformFactory {
  static create(platformIndex: number, position: { x: number; y: number }): Platform {
    const halfSize = PLATFORM_SIZE / 2;
    return {
      id: nextId(),
      platformIndex,
      nextPlatformId: null,
      position,
      orientation: 0,
      shape: [
        { x: -halfSize, y: -halfSize },
        { x: halfSize, y: -halfSize },
        { x: halfSize, y: halfSize },
        { x: -halfSize, y: halfSize },
      ],
      fillColor: PLATFORM_FILL_COLOR,
      borderColor: PLATFORM_BORDER_COLOR,
      borderWidth: 2,
      depth: 0,  // platforms at bottom
    };
  }
}
