import { EventBus } from '@/game/events/EventBus';
import { ISystem } from '@/game/systems/ISystem';
import type { GameState } from '@/game/state/GameState';
import { isControllablePositionable } from '@/game/queries/ControllablePositionable/isControllablePositionable';

export class CameraSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    const targets = state.entities.filter(isControllablePositionable);
    if (targets.length === 0) return;

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const t of targets) {
      const { x, y } = t.position;
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
    const margin = 50; // meters
    minX -= margin; maxX += margin; minY -= margin; maxY += margin;

    let width = maxX - minX;
    let height = maxY - minY;
    const ar = state.aspectRatio || 1;
    const boxAR = width / (height || 1);

    if (boxAR < ar) {
      width = height * ar;
    } else {
      height = width / ar;
    }

    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    state.camera = { position: { x: cx, y: cy }, width, height };
  }
}
