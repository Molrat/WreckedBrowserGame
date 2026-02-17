import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";
import { NeonTextDrawer } from "@/deviceOutput/render/common/NeonTextDrawer";

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
        NeonTextDrawer.drawNeonText(draw, 'NEON-STRIKE', width / 2, 40, '#00ffff', 'bold 48px Arial, sans-serif', 12.5, 7.5, 4);
        NeonTextDrawer.drawNeonText(draw, 'Join Game', width / 2, 90, '#ff0080', 'bold 32px Arial, sans-serif', 12.5, 7.5, 4);

        const rows = 2;
        const cols = statuses.length / rows;
        const pad = 20;
        const rectW = (width - pad * (cols + 1)) / cols;
        const rectH = (height - pad * (rows + 1) - 130) / rows;

        for (let i = 0; i < statuses.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = pad + col * (rectW + pad);
            const y = 130 + pad + row * (rectH + pad);
            const st = statuses[i];

            // Neon colors
            const tileColor = st === 'ready' ? '#39ff14' : st === 'joined' ? '#00ffff' : '#1a0a2e';
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
            NeonTextDrawer.drawNeonText(draw, `P${i + 1}`, x + rectW / 2, y + rectH / 2 - 20, '#ffffff', 'bold 28px Arial, sans-serif', 12.5, 7.5, 4);
            NeonTextDrawer.drawNeonText(draw, label, x + rectW / 2, y + rectH / 2 + 20, textColor, 'bold 16px Arial, sans-serif', 12.5, 7.5, 4);
        }
    }
}