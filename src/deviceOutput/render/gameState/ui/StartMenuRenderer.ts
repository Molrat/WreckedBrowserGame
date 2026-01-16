import { IRenderer } from "../../IRenderer";
import type { GameState } from "../../../../game/state/GameState";
import type { IRenderAPI } from "../../common/IRenderAPI";

export class StartMenuRenderer implements IRenderer{
    constructor(private draw: IRenderAPI) {}

    render(gameState: GameState): void {
        if (gameState.ui.openMenu !== 'start') return;
        const s = gameState.ui.startMenu;
        const statuses = s.playerConnections.map(pc => pc.status);
        const { draw } = this;
        draw.clearCamera();
        const width = draw.width();
        const height = draw.height();
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
            draw.rectFill(x, y, rectW, rectH, tileColor);

            const label = st === 'notJoined' ? 'Press X to join' : st === 'joined' ? 'Press Triangle to be ready' : 'Ready!';
            draw.textDraw(`P${i + 1}`, x + 12, y + 24, '#fff', '16px sans-serif');
            draw.textDraw(label, x + 12, y + 48, '#fff', '16px sans-serif');
        }
    }
}