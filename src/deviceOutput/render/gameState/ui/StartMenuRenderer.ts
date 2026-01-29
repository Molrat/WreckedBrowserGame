import { IScreenRenderer } from "@/deviceOutput/render/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/render/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";

export class StartMenuRenderer implements IScreenRenderer {

    render(gameState: GameState, draw: IScreenRenderAPI): void {
        if (gameState.ui.openMenu !== 'start') return;
        const s = gameState.ui.startMenu;
        const statuses = s.playerConnections.map(pc => pc.status);
        const width = draw.getWidth();
        const height = draw.getHeight();
        draw.clear();
        draw.fillBackground('#111');

        const cols = 4;
        const rows = 2;
        const pad = 20;
        const rectW = (width - pad * (cols + 1)) / cols;
        const rectH = (height - pad * (rows + 1)) / rows;

        for (let i = 0; i < statuses.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = pad + col * (rectW + pad);
            const y = pad + row * (rectH + pad);
            const st = statuses[i];

            const tileColor = st === 'ready' ? '#16a34a' : st === 'joined' ? '#2563eb' : '#374151';
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
                borderColor: null,
                borderWidth: null,
                depth: 0,
            });

            const label = st === 'notJoined' ? 'Press X to join' : st === 'joined' ? 'Press Triangle to be ready' : 'Ready!';
            draw.drawText(`P${i + 1}`, { x: x + 12, y: y + 30 }, '#ffffff', 'bold 20px Arial, sans-serif');
            draw.drawText(label, { x: x + 12, y: y + 55 }, '#ffffff', '16px Arial, sans-serif');
        }
    }
}