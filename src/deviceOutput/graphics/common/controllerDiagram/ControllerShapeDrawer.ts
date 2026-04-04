import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";
import { BUMPER_LABELS, TRIGGER_LABELS } from "./ControllerLabelData";
import { L2_SHAPE, R2_SHAPE } from "./TriggerShapeData";

const BODY_SHAPE: Vector2[] = [
    { x: -111.5, y: 78.3 }, { x: -120.3, y: 76.3 }, { x: -128.1, y: 72 },
    { x: -134.1, y: 65.4 }, { x: -137.8, y: 57.2 }, { x: -139.6, y: 48.4 },
    { x: -140, y: 39.5 }, { x: -139.5, y: 30.5 }, { x: -138.2, y: 21.6 },
    { x: -136.4, y: 12.8 }, { x: -134.2, y: 4.2 }, { x: -131.7, y: -4.5 },
    { x: -128.8, y: -12.9 }, { x: -125.7, y: -21.4 }, { x: -122.3, y: -29.6 },
    { x: -118.5, y: -37.8 }, { x: -114.4, y: -45.8 }, { x: -109.7, y: -53.4 },
    { x: -104.5, y: -60.7 }, { x: -98.5, y: -67.4 }, { x: -91.6, y: -73.1 },
    { x: -83.6, y: -77.1 }, { x: -74.8, y: -78.6 }, { x: -66, y: -77.1 },
    { x: -59.7, y: -70.9 }, { x: -52.1, y: -66.2 }, { x: -43.8, y: -62.9 },
    { x: -35.1, y: -60.6 }, { x: -26.3, y: -59.1 }, { x: -17.3, y: -58.2 },
    { x: -8.4, y: -57.8 }, { x: 0.6, y: -57.9 }, { x: 9.6, y: -57.8 },
    { x: 18.5, y: -58.3 }, { x: 27.5, y: -59.2 }, { x: 36.3, y: -60.8 },
    { x: 44.9, y: -63.2 }, { x: 53.2, y: -66.7 }, { x: 60.6, y: -71.7 },
    { x: 67.2, y: -77.4 }, { x: 76, y: -78.6 }, { x: 84.8, y: -76.7 },
    { x: 92.6, y: -72.4 }, { x: 99.4, y: -66.5 }, { x: 105.3, y: -59.8 },
    { x: 110.4, y: -52.4 }, { x: 115, y: -44.7 }, { x: 119.1, y: -36.7 },
    { x: 122.7, y: -28.5 }, { x: 126.1, y: -20.2 }, { x: 129.2, y: -11.8 },
    { x: 132, y: -3.3 }, { x: 134.5, y: 5.3 }, { x: 136.7, y: 14.1 },
    { x: 138.4, y: 22.9 }, { x: 139.6, y: 31.8 }, { x: 140, y: 40.7 },
    { x: 139.4, y: 49.7 }, { x: 137.4, y: 58.4 }, { x: 133.4, y: 66.4 },
    { x: 127.1, y: 72.7 }, { x: 119.1, y: 76.7 }, { x: 110.3, y: 78.5 },
    { x: 101.4, y: 77.7 }, { x: 92.9, y: 75.1 }, { x: 84.5, y: 71.9 },
    { x: 76.1, y: 68.6 }, { x: 67.7, y: 65.5 }, { x: 59.2, y: 62.6 },
    { x: 50.6, y: 60.1 }, { x: 41.9, y: 58.1 }, { x: 33, y: 56.5 },
    { x: 24.1, y: 55.5 }, { x: 15.2, y: 55.1 }, { x: 6.2, y: 55.3 },
    { x: -2.7, y: 55.6 }, { x: -11.7, y: 55.1 }, { x: -20.7, y: 55.3 },
    { x: -29.6, y: 56.1 }, { x: -38.5, y: 57.4 }, { x: -47.2, y: 59.3 },
    { x: -55.9, y: 61.6 }, { x: -64.5, y: 64.3 }, { x: -72.9, y: 67.4 },
    { x: -81.3, y: 70.6 }, { x: -89.6, y: 73.9 }, { x: -98.1, y: 76.8 },
    { x: -106.9, y: 78.6 },
];

export class ControllerShapeDrawer {
    static drawBody(api: IScreenRenderAPI, cx: number, cy: number): void {
        api.drawPolygon({
            shape: BODY_SHAPE, position: { x: cx, y: cy - 15 }, orientation: 0,
            fillColor: '#1a1a2e', borderColor: '#4444aa', borderWidth: 2, depth: 0,
        });
    }

    static drawTriggers(api: IScreenRenderAPI, cx: number, cy: number): void {
        const shapes = [L2_SHAPE, R2_SHAPE];
        TRIGGER_LABELS.forEach((t, i) => {
            api.drawPolygon({
                shape: shapes[i], position: { x: cx + t.offset.x, y: cy + t.offset.y }, orientation: 0,
                fillColor: '#333366', borderColor: '#6666cc', borderWidth: 1, depth: 0,
            });
        });
    }

    static drawBumpers(api: IScreenRenderAPI, cx: number, cy: number): void {
        const shape: Vector2[] = [
            { x: -25, y: -7 }, { x: 25, y: -7 }, { x: 25, y: 7 }, { x: -25, y: 7 },
        ];
        for (const b of BUMPER_LABELS) {
            api.drawPolygon({
                shape, position: { x: cx + b.offset.x, y: cy + b.offset.y }, orientation: 0,
                fillColor: '#333366', borderColor: '#6666cc', borderWidth: 1, depth: 0,
            });
        }
    }

    static drawStick(api: IScreenRenderAPI, cx: number, cy: number, ox: number, oy: number): void {
        const r = 20;
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
                circle.push({ x: Math.cos(angle) * 11, y: Math.sin(angle) * 11 });
            }
            api.drawPolygon({
                shape: circle, position: { x: cx + b.offset.x, y: cy + b.offset.y }, orientation: 0,
                fillColor: '#333366', borderColor: '#8888dd', borderWidth: 1, depth: 0,
            });
        }
    }
}
