import { IScreenRenderer } from "@/deviceoutput/graphics/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceoutput/graphics/common/IScreenRenderAPI";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { NeonTextDrawer } from "@/deviceoutput/graphics/common/NeonTextDrawer";

export class EndOfGameMenuRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (gameState.ui.openMenu !== 'endOfGame') return;

    const width = draw.getWidth();
    const height = draw.getHeight();
    draw.clear();
    draw.fillBackground('#0a0a14');

    const players = gameState.entities.filter(isPlayer);

    // Title
    NeonTextDrawer.drawNeonText(draw, 'GAME OVER', width / 2, 50, '#ffffff', '#ffff00', 'bold 64px Arial, sans-serif');

    // Sort players by score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const winner = sortedPlayers[0];

    // Winner announcement
    if (winner) {
      const winnerLabel = winner.name ??`P${Number(winner.controllerId) + 1} WINS!`;
      NeonTextDrawer.drawNeonText(draw, winnerLabel, width / 2, 115, '#ffffff', winner.fillColor ?? '#ffff00', 'bold 36px Arial, sans-serif');
    }

    // Scoreboard layout
    const colRank   = width * 0.08;
    const colPlayer = width * 0.18;
    const colRounds = width * 0.35;
    const roundColW = width * 0.07;
    const colTotal  = width * 0.73;
    const colReady  = width * 0.87;
    const startY = 165;
    const rowHeight = 55;
    const maxRounds = Math.max(...sortedPlayers.map(p => p.roundScores.length), 0);

    // Header
    NeonTextDrawer.drawNeonText(draw, 'RANK',   colRank,   startY, '#888888', '#888888', 'bold 15px Arial, sans-serif', 3, 2, 1);
    NeonTextDrawer.drawNeonText(draw, 'PLAYER', colPlayer, startY, '#888888', '#888888', 'bold 15px Arial, sans-serif', 3, 2, 1);
    for (let r = 0; r < maxRounds; r++) {
      NeonTextDrawer.drawNeonText(draw, `R${r + 1}`, colRounds + r * roundColW, startY, '#888888', '#888888', 'bold 14px Arial, sans-serif', 3, 2, 1);
    }
    NeonTextDrawer.drawNeonText(draw, 'TOTAL', colTotal, startY, '#888888', '#888888', 'bold 15px Arial, sans-serif', 3, 2, 1);
    NeonTextDrawer.drawNeonText(draw, 'READY', colReady, startY, '#888888', '#888888', 'bold 15px Arial, sans-serif', 3, 2, 1);

    const medals = ['#ffff00', '#aaaaaa', '#cd7f32'];

    sortedPlayers.forEach((player, index) => {
      const y = startY + (index + 1) * rowHeight;
      const playerColor = player.borderColor ?? player.fillColor ?? '#ffffff';
      const isReady = player.readyForNextRound;

      // Rank with medal color
      const rankColor = medals[index] ?? '#666688';
      NeonTextDrawer.drawNeonText(draw, `#${index + 1}`, colRank, y, '#ffffff', rankColor, 'bold 24px Arial, sans-serif', 10, 6, 3);

      // Player name in their own neon color
      NeonTextDrawer.drawNeonText(draw, player.name ?? `P${Number(player.controllerId) + 1}`, colPlayer, y, '#ffffff', playerColor, 'bold 28px Arial, sans-serif', 12, 7, 3);

      // Round scores
      for (let r = 0; r < maxRounds; r++) {
        const roundScore = player.roundScores[r];
        const scoreText = roundScore !== undefined ? `${roundScore}` : '-';
        NeonTextDrawer.drawNeonText(draw, scoreText, colRounds + r * roundColW, y, '#8888aa', '#8888aa', '18px Arial, sans-serif', 4, 2, 1);
      }

      // Total score
      NeonTextDrawer.drawNeonText(draw, `${player.score}`, colTotal, y, '#ffffff', '#ffffff', 'bold 28px Arial, sans-serif', 10, 6, 3);

      // Ready status at end of row
      const readyColor = isReady ? '#39ff14' : '#ff0080';
      const readyLabel = isReady ? '✓ READY' : 'Press △';
      NeonTextDrawer.drawNeonText(draw, readyLabel, colReady, y, '#ffffff', readyColor, 'bold 24px Arial, sans-serif',
        isReady ? 14 : 8, isReady ? 8 : 4, isReady ? 4 : 2);
    });

    // Footer hint
    NeonTextDrawer.drawNeonText(draw, 'Press △ to toggle ready', width / 2, height - 40, '#444466', '#444466', '18px Arial, sans-serif', 4, 2, 1);
  }
}
