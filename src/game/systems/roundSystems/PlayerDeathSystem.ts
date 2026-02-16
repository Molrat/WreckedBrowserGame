import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import { isMountable } from '@/game/queries/Mountable/isMountable';
import { isFrontWheel as isWheel } from '@/game/queries/Mountable/isWheel';

const PLACEMENT_POINTS = [6, 3, 1, 0];

export class PlayerDeathSystem implements ISystem {
  update(state: GameState, eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;

    const players = state.entities.filter(isPlayer);
    const alivePlayers = players.filter(p => p.health > 0 && p.placement === 0);
    const deadPlayers = players.filter(p => p.health <= 0 && p.placement === 0);
    
    if (deadPlayers.length === 0) return;

    const currentPlacement = players.filter(p => p.placement > 0).length;
    let nextPlacement = players.length - currentPlacement;

    for (let i = state.entities.length - 1; i >= 0; i--) {
      const entity = state.entities[i];
      if (!isPlayer(entity)) continue;
      if (entity.health > 0 || entity.placement > 0) continue;
      entity.placement = nextPlacement;
      eventBus.emit({
        type: 'PlayerDied',
        playerId: entity.id,
        placement: nextPlacement,
        position: { x: entity.position.x, y: entity.position.y },
        color: entity.fillColor ?? '#ffffff',
      });
      // Move to deadEntities
      state.entities.splice(i, 1);
      state.deadEntities.push(entity);
      this.removeMountables(state, entity.id);
      nextPlacement--;
    }

    const remainingAlivePlayers = players.filter(p => p.health > 0 && p.placement === 0).length;
    
    if (remainingAlivePlayers <= 1) {
      for (const entity of state.entities) {
        if (!isPlayer(entity)) continue;
        if (entity.placement > 0) continue;
        if (entity.health > 0) entity.placement = 1;
      }

      // Move dead players back to entities before scoring
      state.entities.push(...state.deadEntities);
      state.deadEntities.length = 0;

      this.assignRoundScores(state, players.length);
      
      const nextRound = state.ui.currentRound + 1;
      state.ui.openMenu = nextRound > state.ui.maxRounds ? 'endOfGame' : 'inbetweenLevels';
    }
  }

  private assignRoundScores(state: GameState, _playerCount: number): void {
    for (const entity of state.entities) {
      if (!isPlayer(entity)) continue;
      const pointsIndex = Math.min(entity.placement - 1, PLACEMENT_POINTS.length - 1);
      const roundPoints = PLACEMENT_POINTS[pointsIndex] ?? 0;
      entity.score += roundPoints;
      entity.roundScores.push(roundPoints);
    }
  }

  private removeMountables(state: GameState, playerId: string): void {
    for (let i = state.entities.length - 1; i >= 0; i--) {
      const e = state.entities[i];
      if (!isMountable(e)) continue;
      if (e.mountedOnPlayerId !== playerId) continue;
      state.entities.splice(i, 1);
      if (isWheel(e)) {
        state.deadEntities.push(e);
      }
    }
  }
}
