import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";

const COLOR = '#aaaadd';

export class SymbolDrawer {
    static draw(api: IScreenRenderAPI, shape: 'triangle' | 'square' | 'circle' | 'cross', x: number, y: number, size: number): void {
        if (shape === 'triangle') this.drawTriangle(api, x, y, size);
        else if (shape === 'square') this.drawSquare(api, x, y, size);
        else if (shape === 'circle') this.drawCircle(api, x, y, size);
        else if (shape === 'cross') this.drawCross(api, x, y, size);
    }

    private static drawTriangle(api: IScreenRenderAPI, x: number, y: number, s: number): void {
        const shape: Vector2[] = [
            { x: 0, y: -s }, { x: s, y: s }, { x: -s, y: s },
        ];
        api.drawPolygon({ shape, position: { x, y }, orientation: 0, fillColor: 'transparent', borderColor: COLOR, borderWidth: 2, depth: 0 });
    }

    private static drawSquare(api: IScreenRenderAPI, x: number, y: number, s: number): void {
        const shape: Vector2[] = [
            { x: -s, y: -s }, { x: s, y: -s }, { x: s, y: s }, { x: -s, y: s },
        ];
        api.drawPolygon({ shape, position: { x, y }, orientation: 0, fillColor: 'transparent', borderColor: COLOR, borderWidth: 2, depth: 0 });
    }

    private static drawCircle(api: IScreenRenderAPI, x: number, y: number, s: number): void {
        const shape: Vector2[] = [];
        for (let i = 0; i < 16; i++) {
            const angle = (i / 16) * Math.PI * 2;
            shape.push({ x: Math.cos(angle) * s, y: Math.sin(angle) * s });
        }
        api.drawPolygon({ shape, position: { x, y }, orientation: 0, fillColor: 'transparent', borderColor: COLOR, borderWidth: 2, depth: 0 });
    }

    private static drawCross(api: IScreenRenderAPI, x: number, y: number, s: number): void {
        api.drawLine({ x: x - s, y: y - s }, { x: x + s, y: y + s }, COLOR, 2);
        api.drawLine({ x: x + s, y: y - s }, { x: x - s, y: y + s }, COLOR, 2);
    }
}
