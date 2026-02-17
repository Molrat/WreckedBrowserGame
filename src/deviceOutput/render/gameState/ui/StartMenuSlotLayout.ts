const ROWS = 2;
const PAD = 20;
const MAX_SLOT_SIZE = 300;

export type SlotRect = { x: number; y: number; width: number; height: number };

export class StartMenuSlotLayout {
    static getSlotRect(slot: number, totalSlots: number, screenWidth: number, screenHeight: number): SlotRect {
        const cols = totalSlots / ROWS;
        const rectW = Math.min(MAX_SLOT_SIZE, (screenWidth - PAD * (cols + 1)) / cols);
        const rectH = Math.min(MAX_SLOT_SIZE, (screenHeight - PAD * (ROWS + 1)) / ROWS);

        const gridW = cols * rectW + PAD * (cols - 1);
        const gridH = ROWS * rectH + PAD * (ROWS - 1);
        const originX = (screenWidth - gridW) / 2;
        const originY = (screenHeight - gridH) / 2;

        const col = slot % cols;
        const row = Math.floor(slot / cols);
        const x = originX + col * (rectW + PAD);
        const y = originY + row * (rectH + PAD);
        return { x, y, width: rectW, height: rectH };
    }
}
