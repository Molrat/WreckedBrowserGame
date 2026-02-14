import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isPlatform } from '@/game/queries/Platform/isPlatform';
import { PlatformFactory } from '@/game/state/entities/Factories/PlatformFactory';
import { computeNextPosition } from './PlatformPositioner';
import type { IPlatform } from '@/game/queries/Platform/IPlatform';
import { NR_OF_PLATFORMS_IN_FRONT_OF_PLAYER, PLATFORM_SIZE, PLATFORM_FILL_COLOR } from '@/game/config/platformConstants';

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

    // Parse original color from constants
    const hex = PLATFORM_FILL_COLOR.substring(1);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    for (const platform of platforms) {
      const age = range > 0 ? (maxIndex - platform.platformIndex) / range : 0;
      // Darken with age: multiply by (1 - age) to go from original color to black
      const darkenedR = Math.round(r * (1 - age * 0.8));
      const darkenedG = Math.round(g * (1 - age * 0.8));
      const darkenedB = Math.round(b * (1 - age * 0.8));
      platform.fillColor = `rgb(${darkenedR}, ${darkenedG}, ${darkenedB})`;
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
