import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { ControllerLabel } from "./ControllerLabelData";
import { SymbolDrawer } from "./SymbolDrawer";

const FONT = '14px Arial, sans-serif';
const TEXT_COLOR = '#aaaadd';
const LINE_COLOR = '#7777aa';
const SYMBOL_GAP = 20;
const SYMBOL_SIZE = 7;

export class ControllerLabelDrawer {
    static drawLabels(api: IScreenRenderAPI, cx: number, cy: number, labels: ControllerLabel[]): void {
        for (const b of labels) {
            const from = { x: cx + b.offset.x, y: cy + b.offset.y };
            const to = { x: cx + b.labelOffset.x, y: cy + b.labelOffset.y };
            api.drawLine(from, to, LINE_COLOR, 1.5);
            if (b.symbolShape) {
                SymbolDrawer.draw(api, b.symbolShape, to.x + SYMBOL_SIZE, to.y, SYMBOL_SIZE);
                api.drawText(b.label, { x: to.x + SYMBOL_GAP, y: to.y + SYMBOL_SIZE - 2 }, TEXT_COLOR, FONT);
            } else {
                api.drawText(b.label, to, TEXT_COLOR, FONT);
            }
        }
    }

    static drawTriggerLabels(api: IScreenRenderAPI, cx: number, cy: number, labels: ControllerLabel[]): void {
        for (const t of labels) {
            const from = { x: cx + t.offset.x, y: cy + t.offset.y - 18 };
            const to = { x: cx + t.labelOffset.x, y: cy + t.labelOffset.y };
            api.drawLine(from, to, LINE_COLOR, 1.5);
            api.drawCenteredText(t.label, to, TEXT_COLOR, FONT);
        }
    }

    static drawStickLabel(api: IScreenRenderAPI, cx: number, cy: number, label: ControllerLabel): void {
        const from = { x: cx + label.offset.x, y: cy + label.offset.y + 20 };
        const to = { x: cx + label.labelOffset.x, y: cy + label.labelOffset.y };
        api.drawLine(from, to, LINE_COLOR, 1.5);
        api.drawCenteredText(label.label, to, TEXT_COLOR, FONT);
    }
}
