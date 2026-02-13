import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';
import { computeNextPosition } from './PlatformPositioner';
import type { IPlatform } from '@/game/queries/Platform/IPlatform';
import { NR_OF_PLATFORMS_IN_FRONT_OF_PLAYER, PLATFORM_SIZE } from '@/game/config/constants';

export class PlatformProgressionSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;

    const platforms = state.entities.filter(isPlatform);
    if (platforms.length === 0) return;

    const highestReached = this.findHighestReached(state, platforms);
    const platformsAhead = platforms.filter(p => p.platformIndex > highestReached).length;

    if (platformsAhead < NR_OF_PLATFORMS_IN_FRONT_OF_PLAYER) {
      this.removeLowestPlatform(state, platforms);
      this.addNextPlatform(state, platforms);
    }

    this.updatePlatformColors(state.entities.filter(isPlatform));
  }

  private findHighestReached(state: GameState, platforms: IPlatform[]): number {
    let highest = 0;
    for (const player of state.entities.filter(isPlayer)) {
      if (player.health <= 0) continue;
      for (const p of platforms) {
        if (p.platformIndex > highest && this.isOnPlatform(player.position, p.position)) {
          highest = p.platformIndex;
        }
      }
    }
    return highest;
  }

  private removeLowestPlatform(state: GameState, platforms: IPlatform[]): void {
    let lowest = platforms[0];
    for (const p of platforms) {
      if (p.platformIndex < lowest.platformIndex) lowest = p;
    }
    const idx = state.entities.findIndex(e => 'id' in e && e.id === lowest.id);
    if (idx !== -1) state.entities.splice(idx, 1);
  }

  private addNextPlatform(state: GameState, platforms: IPlatform[]): void {
    let front = platforms[0];
    for (const p of platforms) {
      if (p.platformIndex > front.platformIndex) front = p;
    }
    const positions = platforms.map(p => p.position);
    const newPos = computeNextPosition(front.position, positions);
    const newPlatform = PlatformFactory.create(front.platformIndex + 1, newPos);
    front.nextPlatformId = newPlatform.id;
    state.entities.push(newPlatform);
  }

  private updatePlatformColors(platforms: IPlatform[]): void {
    if (platforms.length === 0) return;
    const indices = platforms.map(p => p.platformIndex);
    const minIndex = Math.min(...indices);
    const maxIndex = Math.max(...indices);
    const range = maxIndex - minIndex;

    for (const platform of platforms) {
      const age = range > 0 ? (maxIndex - platform.platformIndex) / range : 0;
      const r = Math.round(220 + (74 - 220) * (1 - age));
      const g = Math.round(80 + (85 - 80) * (1 - age));
      const b = Math.round(80 + (104 - 80) * (1 - age));
      platform.fillColor = `rgb(${r}, ${g}, ${b})`;

      const br = Math.round(180 + (45 - 180) * (1 - age));
      const bg = Math.round(50 + (55 - 50) * (1 - age));
      const bb = Math.round(50 + (72 - 50) * (1 - age));
      platform.borderColor = `rgb(${br}, ${bg}, ${bb})`;
    }
  }

  private isOnPlatform(
    playerPos: { x: number; y: number },
    platformPos: { x: number; y: number }
  ): boolean {
    const halfSize = PLATFORM_SIZE / 2;
    return (
      playerPos.x >= platformPos.x - halfSize &&
      playerPos.x <= platformPos.x + halfSize &&
      playerPos.y >= platformPos.y - halfSize &&
      playerPos.y <= platformPos.y + halfSize
    );
  }
}
