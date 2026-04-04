import type { Vector2 } from "@/math/Vector2";

export type ControllerLabel = {
    offset: Vector2;
    symbolShape?: 'triangle' | 'square' | 'circle' | 'cross';
    label: string;
    labelOffset: Vector2;
};

export const BUMPER_LABELS: ControllerLabel[] = [
    { offset: { x: -100, y: -50 }, label: 'L1: dash left', labelOffset: { x: -220, y: -95 } },
    { offset: { x: 100, y: -50 }, label: 'R1: dash right', labelOffset: { x: 155, y: -95 } },
];

export const FACE_BUTTON_LABELS: ControllerLabel[] = [
    { offset: { x: 80, y: -15 }, symbolShape: 'triangle', label: 'dismantle weapon', labelOffset: { x: 170, y: -30 } },
    { offset: { x: 60, y: 5 }, symbolShape: 'square', label: 'dash backwards', labelOffset: { x: 170, y: -5 } },
    { offset: { x: 100, y: 5 }, symbolShape: 'circle', label: 'handbrake', labelOffset: { x: 170, y: 20 } },
    { offset: { x: 80, y: 25 }, symbolShape: 'cross', label: 'use weapon', labelOffset: { x: 170, y: 45 } },
];

export const TRIGGER_LABELS: ControllerLabel[] = [
    { offset: { x: -100, y: -65 }, label: 'L2: brake', labelOffset: { x: -100, y: -130 } },
    { offset: { x: 100, y: -65 }, label: 'R2: throttle', labelOffset: { x: 100, y: -130 } },
];

export const STICK_LABEL: ControllerLabel = {
    offset: { x: -55, y: 30 }, label: 'L stick: steer', labelOffset: { x: -230, y: 55 },
};
