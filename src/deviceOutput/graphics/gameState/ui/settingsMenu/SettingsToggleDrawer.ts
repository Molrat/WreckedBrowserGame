import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { GameSettings } from "@/game/state/ui/GameSettings";
import { NeonTextDrawer } from "@/deviceOutput/graphics/common/NeonTextDrawer";

export class SettingsToggleDrawer {
    static draw(api: IScreenRenderAPI, settings: GameSettings, selectedIndex: number, x: number, y: number): void {
        NeonTextDrawer.drawNeonText(api, 'SETTINGS', x, y, '#ffffff', '#00ffff', 'bold 22px Arial, sans-serif', 8, 5, 3);

        const toggleY = y + 50;
        const isSelected = selectedIndex === 0;
        const isOn = settings.carouselEnabled;
        const color = isOn ? '#ff69b4' : '#555577';
        const glow = isOn ? '#ff69b4' : '#888899';
        const prefix = isSelected ? '▸ ' : '  ';
        const label = `${prefix}CAROUSEL: ${isOn ? 'ON' : 'OFF'}`;

        NeonTextDrawer.drawNeonText(api, label, x, toggleY, '#ffffff', glow, 'bold 18px Arial, sans-serif', 6, 3, 2);

        const helpY = toggleY + 40;
        api.drawCenteredText('[↑/↓] navigate   [✕] toggle', { x, y: helpY }, '#bbbbdd', '16px Arial, sans-serif');
    }
}
