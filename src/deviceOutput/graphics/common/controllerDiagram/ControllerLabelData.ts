import type { Vector2 } from "@/math/Vector2";

export type ControllerLabel = {
    offset: Vector2;
    label: string;
    labelOffset: Vector2;
};

export const BUMPER_LABELS: ControllerLabel[] = [
    { offset: { x: -70, y: -30 }, label: 'L1: bach left', labelOffset: { x: -120, y: -60 } },
    { offset: { x: 70, y: -30 }, label: 'R1: bach right', labelOffset: { x: 60, y: -60 } },
];

export const FACE_BUTTON_LABELS: ControllerLabel[] = [
    { offset: { x: 52, y: 10 }, label: '○  handbrake', labelOffset: { x: 110, y: 10 } },
    { offset: { x: 32, y: -10 }, label: '□  bash backwards', labelOffset: { x: 110, y: -10 } },
    { offset: { x: 52, y: 30 }, label: '✕  use weapon', labelOffset: { x: 110, y: 30 } },
    { offset: { x: 32, y: 10 }, label: '△  dismantle weapon', labelOffset: { x: 110, y: 50 } },
];

export const TRIGGER_LABELS: ControllerLabel[] = [
    { offset: { x: -60, y: -50 }, label: 'L2: brake', labelOffset: { x: -120, y: -85 } },
    { offset: { x: 60, y: -50 }, label: 'R2: throttle', labelOffset: { x: 60, y: -85 } },
];

export const STICK_LABEL: ControllerLabel = {
    offset: { x: -32, y: 20 }, label: 'L stick: steer', labelOffset: { x: -130, y: 40 },
};
