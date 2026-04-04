import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { ControllerLabel } from "./ControllerLabelData";

const FONT = '12px Arial, sans-serif';
const TEXT_COLOR = '#aaaadd';
const LINE_COLOR = '#555588';

export class ControllerLabelDrawer {
    static drawLabels(api: IScreenRenderAPI, cx: number, cy: number, labels: ControllerLabel[]): void {
        for (const b of labels) {
            const from = { x: cx + b.offset.x, y: cy + b.offset.y };
            const to = { x: cx + b.labelOffset.x, y: cy + b.labelOffset.y };
            api.drawLine(from, to, LINE_COLOR, 1);
            api.drawText(b.label, to, TEXT_COLOR, FONT);
        }
    }

    static drawTriggerLabels(api: IScreenRenderAPI, cx: number, cy: number, labels: ControllerLabel[]): void {
        for (const t of labels) {
            const from = { x: cx + t.offset.x, y: cy + t.offset.y - 12 };
            const to = { x: cx + t.labelOffset.x, y: cy + t.labelOffset.y };
            api.drawLine(from, to, LINE_COLOR, 1);
            api.drawText(t.label, to, TEXT_COLOR, FONT);
        }
    }

    static drawStickLabel(api: IScreenRenderAPI, cx: number, cy: number, label: ControllerLabel): void {
        const from = { x: cx + label.offset.x - 12, y: cy + label.offset.y };
        const to = { x: cx + label.labelOffset.x, y: cy + label.labelOffset.y };
        api.drawLine(from, to, LINE_COLOR, 1);
        api.drawText(label.label, to, TEXT_COLOR, FONT);
    }
}
