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
        NeonTextDrawer.drawNeonText(draw, 'NEON-STRIKE', width / 2, 40, '#00ffff', '#ffffff', 'bold 48px Arial, sans-serif', 12.5, 7.5, 4);
        NeonTextDrawer.drawNeonText(draw, 'Join Game', width / 2, 90, '#ff0080', '#ffffff', 'bold 32px Arial, sans-serif', 12.5, 7.5, 4);

        const playernames = PLAYER_COLOR_PALETTE.map(c => c[1].toUpperCase());
        for (let i = 0; i < statuses.length; i++) {
            const { x, y, width: rectW, height: rectH } = StartMenuSlotLayout.getSlotRect(i, statuses.length, width, height);
            const st = statuses[i];

            // Neon colors
            const tileColor = st === 'ready' ? '#1cb800' : st === 'joined' ? PLAYER_COLOR_PALETTE[i][0] : '#1a0a2e';
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

            const label = st === 'notJoined' ? 'Press X' : st === 'joined' ? 'Press Δ' : 'READY!';
            const textColor = st === 'ready' ? '#00ff00' : st === 'joined' ? '#00ffff' : '#666666';
            NeonTextDrawer.drawNeonText(draw, `${playernames[i]}`, x + rectW / 2, y + rectH / 2 - 20, '#ffffff', '#ffffff', 'bold 28px Arial, sans-serif', 12.5, 7.5, 4);
            NeonTextDrawer.drawNeonText(draw, label, x + rectW / 2, y + rectH / 2 + 20, textColor, '#ffffff', 'bold 16px Arial, sans-serif', 12.5, 7.5, 4);
        }
    }
}