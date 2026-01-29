import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";
import { isPlayer } from "@/game/queries/Player/isPlayer";

export class EndOfGameMenuRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (gameState.ui.openMenu !== 'endOfGame') return;

    const width = draw.getWidth();
    const height = draw.getHeight();
    draw.clear();
    draw.fillBackground('#111');

    const players = gameState.entities.filter(isPlayer);

    // Title
    draw.drawText(
      'Game Over!',
      { x: width / 2 - 100, y: 60 },
      '#fbbf24',
      'bold 42px Arial, sans-serif'
    );

    // Sort players by score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];

    // Winner announcement
    if (winner) {
      draw.drawText(
        `🏆 P${Number(winner.controllerId) + 1} Wins! 🏆`,
        { x: width / 2 - 120, y: 110 },
        winner.fillColor ?? '#fbbf24',
        'bold 32px Arial, sans-serif'
      );
    }

    // Final scoreboard
    const startY = 170;
    const rowHeight = 45;

    // Header
    draw.drawText('Rank', { x: 80, y: startY }, '#888', 'bold 16px Arial');
    draw.drawText('Player', { x: 150, y: startY }, '#888', 'bold 16px Arial');
    draw.drawText('R1', { x: 260, y: startY }, '#888', 'bold 14px Arial');
    draw.drawText('R2', { x: 310, y: startY }, '#888', 'bold 14px Arial');
    draw.drawText('R3', { x: 360, y: startY }, '#888', 'bold 14px Arial');
    draw.drawText('R4', { x: 410, y: startY }, '#888', 'bold 14px Arial');
    draw.drawText('R5', { x: 460, y: startY }, '#888', 'bold 14px Arial');
    draw.drawText('Total', { x: 520, y: startY }, '#888', 'bold 16px Arial');

    sortedPlayers.forEach((player, index) => {
      const y = startY + (index + 1) * rowHeight;
      const medals = ['🥇', '🥈', '🥉', ''];
      
      draw.drawText(medals[index] ?? '', { x: 80, y }, '#fff', '20px Arial');
      draw.drawText(
        `P${Number(player.controllerId) + 1}`,
        { x: 150, y },
        player.fillColor ?? '#fff',
        'bold 20px Arial'
      );
      
      // Round scores
      for (let r = 0; r < 5; r++) {
        const roundScore = player.roundScores[r] ?? '-';
        draw.drawText(`${roundScore}`, { x: 260 + r * 50, y }, '#aaa', '16px Arial');
      }
      
      draw.drawText(`${player.score}`, { x: 520, y }, '#ffffff', 'bold 22px Arial');
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
      'Press △ to return to main menu',
      { x: width / 2 - 160, y: height - 40 },
      '#888',
      '18px Arial, sans-serif'
    );
  }
}
