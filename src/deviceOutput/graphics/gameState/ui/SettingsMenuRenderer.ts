import { IScreenRenderer } from "@/deviceOutput/graphics/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import { NeonTextDrawer } from "@/deviceOutput/graphics/common/NeonTextDrawer";
import { ControllerDiagramDrawer } from "@/deviceOutput/graphics/common/controllerDiagram/ControllerDiagramDrawer";
import { SettingsToggleDrawer } from "./settingsMenu/SettingsToggleDrawer";

export class SettingsMenuRenderer implements IScreenRenderer {
    render(gameState: GameState, draw: IScreenRenderAPI): void {
        if (gameState.ui.openMenu !== 'settingsMenu') return;

        const w = draw.getWidth();
        const h = draw.getHeight();
        draw.clear();
        draw.fillBackground('#0a0a14');

        NeonTextDrawer.drawNeonText(draw, 'GET READY', w / 2, 40, '#ffffff', '#00ffff', 'bold 36px Arial, sans-serif', 10, 6, 3);

        SettingsToggleDrawer.draw(draw, gameState.ui.settings, gameState.ui.settingsMenu.selectedIndex, w * 0.25, h * 0.35);

        NeonTextDrawer.drawNeonText(draw, 'CONTROLS', w * 0.7, h * 0.2, '#ffffff', '#ff00ff', 'bold 22px Arial, sans-serif', 8, 5, 3);
        ControllerDiagramDrawer.draw(draw, w * 0.7, h * 0.55);

        NeonTextDrawer.drawNeonText(draw, 'Press △ to start!', w / 2, h - 40, '#ffffff', '#00ff88', 'bold 22px Arial, sans-serif', 8, 5, 3);
    }
}
