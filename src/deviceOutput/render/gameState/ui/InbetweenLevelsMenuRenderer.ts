import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";
import { isPlayer } from "@/game/queries/Player/isPlayer";

export class InbetweenLevelsMenuRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (gameState.ui.openMenu !== 'inbetweenLevels') return;

    const width = draw.getWidth();
    const height = draw.getHeight();
    draw.clear();
    draw.fillBackground('#111');

    const players = gameState.entities.filter(isPlayer);
    const round = gameState.ui.currentRound;

    // Title
    draw.drawText(
      `Round ${round} Complete!`,
      { x: width / 2 - 150, y: 60 },
      '#ffffff',
      'bold 36px Arial, sans-serif'
    );

    // Sort players by score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    // Draw scoreboard
    const startY = 120;
    const rowHeight = 50;

    // Header
    draw.drawText('Player', { x: 100, y: startY }, '#888', 'bold 18px Arial, sans-serif');
    draw.drawText('This Round', { x: 300, y: startY }, '#888', 'bold 18px Arial, sans-serif');
    draw.drawText('Total', { x: 450, y: startY }, '#888', 'bold 18px Arial, sans-serif');

    sortedPlayers.forEach((player, index) => {
      const y = startY + (index + 1) * rowHeight;
      const lastRoundScore = player.roundScores[player.roundScores.length - 1] ?? 0;
      
      draw.drawText(
        `P${Number(player.controllerId) + 1}`,
        { x: 100, y },
        player.fillColor ?? '#fff',
        'bold 24px Arial, sans-serif'
      );
      draw.drawText(
        `+${lastRoundScore}`,
        { x: 300, y },
        '#22c55e',
        '24px Arial, sans-serif'
      );
      draw.drawText(
        `${player.score}`,
        { x: 450, y },
        '#ffffff',
        'bold 24px Arial, sans-serif'
      );
    });

    // Ready status
    const readyY = height - 100;
    players.forEach((player, index) => {
      const isReady = player.currentGamepad.triangle;
      const x = 100 + index * 120;
      const color = isReady ? '#16a34a' : '#374151';
      const label = isReady ? 'Ready!' : 'Press △';
      
      draw.drawText(`P${Number(player.controllerId) + 1}`, { x, y: readyY }, player.fillColor ?? '#fff', 'bold 16px Arial');
      draw.drawText(label, { x, y: readyY + 25 }, color, '14px Arial');
    });

    draw.drawText(
      'Press △ to continue to next round',
      { x: width / 2 - 180, y: height - 40 },
      '#888',
      '18px Arial, sans-serif'
    );
  }
}
