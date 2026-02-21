import { IScreenRenderer } from "@/deviceoutput/graphics/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceoutput/graphics/common/IScreenRenderAPI";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { NeonTextDrawer } from "@/deviceoutput/graphics/common/NeonTextDrawer";

export class InbetweenLevelsMenuRenderer implements IScreenRenderer {
  render(gameState: GameState, draw: IScreenRenderAPI): void {
    if (gameState.ui.openMenu !== 'inbetweenLevels') return;

    const width = draw.getWidth();
    const height = draw.getHeight();
    draw.clear();
    draw.fillBackground('#0a0a14');

    const players = gameState.entities.filter(isPlayer);
    const round = gameState.ui.currentRound;

    // Title
    NeonTextDrawer.drawNeonText(draw, `Round ${round} Complete!`, width / 2, 55, '#00ffff', '#ffffff','bold 48px Arial, sans-serif');

    // Sort players by score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    // Scoreboard layout
    const colPlayer = width * 0.15;
    const colRound  = width * 0.42;
    const colTotal  = width * 0.62;
    const colReady  = width * 0.82;
    const startY = 130;
    const rowHeight = 60;

    // Header row
    const headerY = startY;
    NeonTextDrawer.drawNeonText(draw, 'PLAYER',     colPlayer, headerY, '#ffffff','#888888', 'bold 16px Arial, sans-serif', 4, 2, 1);
    NeonTextDrawer.drawNeonText(draw, 'THIS ROUND', colRound,  headerY, '#ffffff', '#888888','bold 16px Arial, sans-serif', 4, 2, 1);
    NeonTextDrawer.drawNeonText(draw, 'TOTAL',      colTotal,  headerY, '#ffffff', '#888888','bold 16px Arial, sans-serif', 4, 2, 1);
    NeonTextDrawer.drawNeonText(draw, 'READY',      colReady,  headerY, '#ffffff', '#888888','bold 16px Arial, sans-serif', 4, 2, 1);

    sortedPlayers.forEach((player, index) => {
      const y = startY + (index + 1) * rowHeight;
      const lastRoundScore = player.roundScores[player.roundScores.length - 1] ?? 0;
      const playerColor = player.borderColor ?? player.fillColor?? '#ffffff';
      const isReady = player.readyForNextRound;

      // Player name in their own color
      NeonTextDrawer.drawNeonText(
        draw,
        player.name ?? `P${Number(player.controllerId) + 1}`,
        colPlayer, y,
        playerColor,
        playerColor,
        'bold 30px Arial, sans-serif',
        4, 2, 1
      );

      // Round score in green
      NeonTextDrawer.drawNeonText(
        draw,
        `+${lastRoundScore}`,
        colRound, y,
        '#ffffff',
        '#39ff14',
        'bold 26px Arial, sans-serif',
        6, 3, 1
      );

      // Total score in white
      NeonTextDrawer.drawNeonText(
        draw,
        `${player.score}`,
        colTotal, y,
        '#ffffff',
        '#ffffff',
        'bold 28px Arial, sans-serif',
        6, 3, 1
      );

      // Ready status at end of row, large
      const readyColor = isReady ? '#39ff14' : '#ff0080';
      const readyLabel = isReady ? '✓ READY' : 'Press △';
      NeonTextDrawer.drawNeonText(
        draw,
        readyLabel,
        colReady, y,
        '#ffffff',
        readyColor,
        'bold 26px Arial, sans-serif',
        isReady ? 14 : 8, isReady ? 8 : 4, isReady ? 4 : 2
      );
    });
  }
}
