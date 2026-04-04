import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";
import { BUMPER_LABELS, TRIGGER_LABELS } from "./ControllerLabelData";

const BODY_SHAPE: Vector2[] = [
    { x: -80, y: -35 }, { x: -60, y: -45 }, { x: 60, y: -45 },
    { x: 80, y: -35 }, { x: 85, y: 10 }, { x: 65, y: 50 },
    { x: 30, y: 55 }, { x: 15, y: 40 }, { x: -15, y: 40 },
    { x: -30, y: 55 }, { x: -65, y: 50 }, { x: -85, y: 10 },
];

export class ControllerShapeDrawer {
    static drawBody(api: IScreenRenderAPI, cx: number, cy: number): void {
        api.drawPolygon({
            shape: BODY_SHAPE, position: { x: cx, y: cy }, orientation: 0,
            fillColor: '#1a1a2e', borderColor: '#4444aa', borderWidth: 2, depth: 0,
        });
    }

    static drawTriggers(api: IScreenRenderAPI, cx: number, cy: number): void {
        const shape: Vector2[] = [
            { x: -15, y: 0 }, { x: 15, y: 0 }, { x: 12, y: -12 }, { x: -12, y: -12 },
        ];
        for (const t of TRIGGER_LABELS) {
            api.drawPolygon({
                shape, position: { x: cx + t.offset.x, y: cy + t.offset.y }, orientation: 0,
                fillColor: '#333366', borderColor: '#6666cc', borderWidth: 1, depth: 0,
            });
        }
    }

    static drawBumpers(api: IScreenRenderAPI, cx: number, cy: number): void {
        const shape: Vector2[] = [
            { x: -20, y: 5 }, { x: 20, y: 5 }, { x: 18, y: -5 }, { x: -18, y: -5 },
        ];
        for (const b of BUMPER_LABELS) {
            api.drawPolygon({
                shape, position: { x: cx + b.offset.x, y: cy + b.offset.y }, orientation: 0,
                fillColor: '#333366', borderColor: '#6666cc', borderWidth: 1, depth: 0,
            });
        }
    }

    static drawStick(api: IScreenRenderAPI, cx: number, cy: number, ox: number, oy: number): void {
        const r = 12;
        const circle: Vector2[] = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            circle.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
        }
        api.drawPolygon({
            shape: circle, position: { x: cx + ox, y: cy + oy }, orientation: 0,
            fillColor: '#333366', borderColor: '#6666cc', borderWidth: 1, depth: 0,
        });
    }

    static drawFaceButtons(api: IScreenRenderAPI, cx: number, cy: number, buttons: { offset: Vector2 }[]): void {
        for (const b of buttons) {
            const circle: Vector2[] = [];
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                circle.push({ x: Math.cos(angle) * 7, y: Math.sin(angle) * 7 });
            }
            api.drawPolygon({
                shape: circle, position: { x: cx + b.offset.x, y: cy + b.offset.y }, orientation: 0,
                fillColor: '#333366', borderColor: '#8888dd', borderWidth: 1, depth: 0,
            });
        }
    }
}
