import { EffectsState } from "./EffectsState";
import { GameEvent } from "../../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "./IEffectRenderer";
import type { IScreenRenderAPI } from "../common/IScreenRenderAPI";
import { Vector2 } from "@/math/Vector2";

export class PlayerJoinedEffectRenderer implements IEffectRenderer {
    private effectsState: EffectsState = {};

    render(events: GameEvent[], draw: IScreenRenderAPI) {
        const now = performance.now();
        // Ingest events into effects state
        for (const ev of events) {
            if (ev.type === 'StartMenuPlayerJoined') {
                const duration = 600; // ms
                const e = { slot: ev.slot, startTime: now, duration };
                (this.effectsState.joinEffects ??= []).push(e);
            }
        }

        // Draw active join effects (fade/scale over time)
        const joinEffects = this.effectsState.joinEffects ?? [];
        const cols = 4;
        const rows = 2;
        const pad = 20;
        const width = draw.getWidth();
        const height = draw.getHeight();
        const rectW = (width - pad * (cols + 1)) / cols;
        const rectH = (height - pad * (rows + 1)) / rows;

        const remaining: typeof joinEffects = [];
        for (const fx of joinEffects) {
            const t = (now - fx.startTime) / fx.duration;
            if (t >= 1) {
                continue; // expired
            }
            remaining.push(fx);

            const col = fx.slot % cols;
            const row = Math.floor(fx.slot / cols);
            const x = pad + col * (rectW + pad);
            const y = pad + row * (rectH + pad);

            // Pulse alpha and border thickness
            const alpha = 1 - t;
            const thickness = 4 + Math.sin(t * Math.PI) * 4;

            // Stroke border with alpha
            const polygon: Vector2[] = [
                { x: 0, y: 0 },
                { x: rectW, y: 0 },
                { x: rectW, y: rectH },
                { x: 0, y: rectH }
            ];
            draw.drawPolygon(
                {
                    shape: polygon,
                    position: { x: x, y: y },
                    orientation: 0,
                    fillColor: `rgba(245, 158, 11, 1, ${alpha * 0.2})`,
                    borderColor: `rgba(245, 158, 11, ${alpha})`,
                    borderWidth: thickness,
                }
            );
        }

        // Keep only non-expired animations
        this.effectsState.joinEffects = remaining;
    }
}