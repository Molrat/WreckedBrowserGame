import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { Vector2 } from "@/math/Vector2";
import { BUMPER_LABELS, TRIGGER_LABELS } from "./ControllerLabelData";

const BODY_SHAPE: Vector2[] = [
    // top-left shoulder
    { x: -100, y: -68 }, { x: -80, y: -73 },
    // top center (wide flat touchpad area)
    { x: -45, y: -75 }, { x: 0, y: -76 }, { x: 45, y: -75 },
    // top-right shoulder
    { x: 80, y: -73 }, { x: 100, y: -68 },
    // right shoulder curving down into body
    { x: 118, y: -58 }, { x: 130, y: -42 }, { x: 135, y: -25 },
    // right body narrows into grip
    { x: 132, y: -8 }, { x: 125, y: 8 }, { x: 118, y: 22 },
    // right grip going down and outward
    { x: 114, y: 38 }, { x: 113, y: 55 }, { x: 115, y: 72 },
    { x: 118, y: 88 }, { x: 120, y: 100 },
    // right grip tip (rounded)
    { x: 118, y: 110 }, { x: 110, y: 117 }, { x: 100, y: 118 },
    { x: 92, y: 114 }, { x: 88, y: 105 },
    // inner right grip going back up
    { x: 85, y: 90 }, { x: 80, y: 72 }, { x: 72, y: 55 },
    { x: 62, y: 40 }, { x: 50, y: 28 },
    // bottom center concave arch
    { x: 35, y: 20 }, { x: 18, y: 16 }, { x: 0, y: 14 },
    { x: -18, y: 16 }, { x: -35, y: 20 },
    // inner left grip going down
    { x: -50, y: 28 }, { x: -62, y: 40 }, { x: -72, y: 55 },
    { x: -80, y: 72 }, { x: -85, y: 90 },
    // left grip tip (rounded)
    { x: -88, y: 105 }, { x: -92, y: 114 }, { x: -100, y: 118 },
    { x: -110, y: 117 }, { x: -118, y: 110 }, { x: -120, y: 100 },
    // left grip going back up
    { x: -118, y: 88 }, { x: -115, y: 72 }, { x: -113, y: 55 },
    { x: -114, y: 38 }, { x: -118, y: 22 },
    // left body widens from grip
    { x: -125, y: 8 }, { x: -132, y: -8 }, { x: -135, y: -25 },
    // left shoulder
    { x: -130, y: -42 }, { x: -118, y: -58 },
];

export class ControllerShapeDrawer {
    static drawBody(api: IScreenRenderAPI, cx: number, cy: number): void {
        api.drawPolygon({
            shape: BODY_SHAPE, position: { x: cx, y: cy - 15 }, orientation: 0,
            fillColor: '#1a1a2e', borderColor: '#4444aa', borderWidth: 2, depth: 0,
        });
    }

    static drawTriggers(api: IScreenRenderAPI, cx: number, cy: number): void {
        const shape: Vector2[] = [
            { x: -22, y: 0 }, { x: 22, y: 0 }, { x: 18, y: -18 }, { x: -18, y: -18 },
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
            { x: -32, y: 7 }, { x: 32, y: 7 }, { x: 28, y: -7 }, { x: -28, y: -7 },
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
