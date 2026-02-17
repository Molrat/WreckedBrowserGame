const ROWS = 2;
const PAD = 20;
const TITLE_OFFSET = 130;

export type SlotRect = { x: number; y: number; width: number; height: number };

export class StartMenuSlotLayout {
    static getSlotRect(slot: number, totalSlots: number, screenWidth: number, screenHeight: number): SlotRect {
        const cols = totalSlots / ROWS;
        const rectW = (screenWidth - PAD * (cols + 1)) / cols;
        const rectH = (screenHeight - PAD * (ROWS + 1) - TITLE_OFFSET) / ROWS;
        const col = slot % cols;
        const row = Math.floor(slot / cols);
        const x = PAD + col * (rectW + PAD);
        const y = TITLE_OFFSET + PAD + row * (rectH + PAD);
        return { x, y, width: rectW, height: rectH };
    }
}
