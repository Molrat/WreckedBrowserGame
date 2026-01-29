import type { Platform } from '@/game/state/entities/Platform';
import { nextId } from '@/utils/id';

const PLATFORM_SIZE = 10; // meters

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
      fillColor: '#4a5568',
      borderColor: '#2d3748',
      borderWidth: 2,
      depth: 0,  // platforms at bottom
      // Textable
      text: `${platformIndex}`,
      textOffset: { x: 0, y: 0 },
      textSize: 3,
      textColor: '#ffffff',
      textDepth: 1,  // platform text above platforms
    };
  }

  static getPlatformSize(): number {
    return PLATFORM_SIZE;
  }
}
