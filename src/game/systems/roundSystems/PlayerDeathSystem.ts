import type { GameState } from '@/game/state/GameState';
import type { ISystem } from '@/game/systems/ISystem';
import type { EventBus } from '@/game/events/EventBus';
import { isPlayer } from '@/game/queries/Player/isPlayer';
import type { IPlayer } from '@/game/queries/Player/IPlayer';
import { isMountable } from '@/game/queries/Mountable/isMountable';
import { isFrontWheel as isWheel } from '@/game/queries/Mountable/isWheel';

const PLACEMENT_POINTS = [6, 3, 1, 0];
const ROUND_WON_DELAY = 3;

export class PlayerDeathSystem implements ISystem {
  update(state: GameState, eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;

    if (this.transitionToMenuIfWinnerAnnouncementIsOver(state)) return;

    this.processDeadPlayers(state, eventBus);
  }

  private transitionToMenuIfWinnerAnnouncementIsOver(state: GameState): boolean {
    if (!state.ui.roundWon) return false;
    const elapsed = state.time.total - state.ui.roundWon.timestamp;
    if (elapsed < ROUND_WON_DELAY) return false;

    state.ui.roundWon = null;
    state.entities.push(...state.deadEntities);
    state.deadEntities.length = 0;
    const nextRound = state.ui.currentRound + 1;
    state.ui.openMenu = nextRound > state.ui.maxRounds ? 'endOfGame' : 'inbetweenLevels';
    return true;
  }

  private processDeadPlayers(state: GameState, eventBus: EventBus): void {
    const players = state.entities.filter(isPlayer);
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
      state.entities.splice(i, 1);
      state.deadEntities.push(entity);
      this.removeMountables(state, entity.id);
      nextPlacement--;
    }

    if (state.ui.roundWon) return;
    const remaining = state.entities.filter(isPlayer).filter(p => p.health > 0 && p.placement === 0);
    if (remaining.length > 1) return;

    this.finalizeRound(state, remaining);
  }

  private finalizeRound(state: GameState, remaining: IPlayer[]): void {
    const [winnerName, winnerColor] = this.assignWinnerPlacement(state, remaining);
    this.assignRoundScores(state);
    state.ui.roundWon = { winnerName, winnerColor: winnerColor, timestamp: state.time.total };
  }

  private assignWinnerPlacement(state: GameState, remaining: IPlayer[]): [string, string] {
    for (const p of remaining) {
      if (p.placement === 0 && p.health > 0) p.placement = 1;
    }
    return remaining.length > 0
      ? ([remaining[0].name ?? 'Unknown', remaining[0].borderColor ?? '#ffffff'])
      : ['Nobody', '#ffffff'];
  }

  private assignRoundScores(state: GameState): void {
    const allPlayers = [...state.entities, ...state.deadEntities].filter(isPlayer);
    for (const player of allPlayers) {
      const pointsIndex = Math.min(player.placement - 1, PLACEMENT_POINTS.length - 1);
      const roundPoints = PLACEMENT_POINTS[pointsIndex] ?? 0;
      player.score += roundPoints;
      player.roundScores.push(roundPoints);
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
