import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";
import { NeonTextDrawer } from "@/deviceOutput/render/common/NeonTextDrawer";
import { PLAYER_COLOR_PALETTE } from "@/game/config/carAppearanceConstants";
import { StartMenuSlotLayout } from "./StartMenuSlotLayout";
export class StartMenuRenderer implements IScreenRenderer {

    render(gameState: GameState, draw: IScreenRenderAPI): void {
        if (gameState.ui.openMenu !== 'start') return;
        const s = gameState.ui.startMenu;
        const statuses = s.playerConnections.map(pc => pc.status);
        const width = draw.getWidth();
        const height = draw.getHeight();
        draw.clear();
        draw.fillBackground('#0a0a14');

        // Title
        NeonTextDrawer.drawNeonText(draw, 'NEON-STRIKE', width / 2, 40, '#ffffff',  '#00ffff', 'bold 48px Arial, sans-serif', 12.5, 7.5, 4);
        NeonTextDrawer.drawNeonText(draw, 'CARMAGEDDON', width / 2, 90, '#ffffff','#ff00ff', 'bold 32px Arial, sans-serif', 12.5, 7.5, 4);

        const playernames = PLAYER_COLOR_PALETTE.map(c => c[1].toUpperCase());
        for (let i = 0; i < statuses.length; i++) {
            const { x, y, width: rectW, height: rectH } = StartMenuSlotLayout.getSlotRect(i, statuses.length, width, height);
            const st = statuses[i];

            // Neon colors
            const playerColor = PLAYER_COLOR_PALETTE[i][0];
            const tileColor = st === 'ready' ? this.darkenColor(playerColor) : st === 'joined' ? playerColor : '#1a0a2e';
            const tileShape: Vector2[] = [
                { x: 0, y: 0 },
                { x: rectW, y: 0 },
                { x: rectW, y: rectH },
                { x: 0, y: rectH }
            ];
            draw.drawPolygon({
                shape: tileShape,
                position: { x, y },
                orientation: 0,
                fillColor: tileColor,
                borderColor: tileColor,
                borderWidth: 2,
                depth: 0,
            });

            const label = st === 'notJoined' ? 'Press X to join' : st === 'joined' ? 'Press Δ to start' : 'READY!';

            if (st === 'notJoined') {
                // Dark tile: bright neon text with glow
                NeonTextDrawer.drawNeonText(draw, `${playernames[i]}`, x + rectW / 2, y + rectH / 2 - 20, '#ffffff', playerColor, 'bold 28px Arial, sans-serif', 10, 6, 3);
                NeonTextDrawer.drawNeonText(draw, label, x + rectW / 2, y + rectH / 2 + 20, '#ffffff', '#ffffff', 'bold 14px Arial, sans-serif', 4, 2, 1);
            } else {
                // Bright tile: plain dark text
                draw.drawCenteredText(`${playernames[i]}`, { x: x + rectW / 2, y: y + rectH / 2 - 20 }, '#111111', 'bold 28px Arial, sans-serif');
                draw.drawCenteredText(label, { x: x + rectW / 2, y: y + rectH / 2 + 20 }, '#111111', 'bold 14px Arial, sans-serif');
            }
        }

        
    }

    darkenColor(color: string): string {
        // Simple function to darken a hex color by 50%
        const c = color.substring(1); // remove '#'
        const r = Math.floor(parseInt(c.substring(0, 2), 16) * 0.5);
        const g = Math.floor(parseInt(c.substring(2, 4), 16) * 0.5);
        const b = Math.floor(parseInt(c.substring(4, 6), 16) * 0.5);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
}