import { EffectsState } from "./EffectsState";
import { GameEvent } from "../../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "./IEffectRenderer";
import type { IScreenRenderAPI } from "../common/IScreenRenderAPI";
import { Vector2 } from "@/math/Vector2";
import { StartMenuSlotLayout } from "../gameState/ui/StartMenuSlotLayout";

export class PlayerJoinedEffectRenderer implements IEffectRenderer {
    private effectsState: EffectsState = {};

    constructor(private draw: IScreenRenderAPI) {}

    render(events: GameEvent[]) {
        const draw = this.draw;
        const now = performance.now();
        // Ingest events into effects state
        for (const ev of events) {
            if (ev.type === 'StartMenuPlayerJoined') {
                const duration = 600; // ms
                const { x, y, width, height } = StartMenuSlotLayout.getSlotRect(ev.slot, ev.totalSlots, this.draw.getWidth(), this.draw.getHeight());
                const e = { slot: ev.slot, startTime: now, duration, x, y, width, height };
                (this.effectsState.joinEffects ??= []).push(e);
            }
        }

        // Draw active join effects (fade/scale over time)
        const joinEffects = this.effectsState.joinEffects ?? [];
        const pad = 20;
        const now_perf = performance.now();

        const remaining: typeof joinEffects = [];
        for (const fx of joinEffects) {
            const t = (now_perf - fx.startTime) / fx.duration;
            if (t >= 1) {
                continue; // expired
            }
            remaining.push(fx);

            // Pulse alpha and border thickness
            const alpha = 1 - t;
            const thickness = 4 + Math.sin(t * Math.PI) * 4;

            // Stroke border with alpha
            const polygon: Vector2[] = [
                { x: 0, y: 0 },
                { x: fx.width, y: 0 },
                { x: fx.width, y: fx.height },
                { x: 0, y: fx.height }
            ];
            draw.drawPolygon(
                {
                    shape: polygon,
                    position: { x: fx.x, y: fx.y },
                    orientation: 0,
                    fillColor: `rgba(245, 158, 11, 1, ${alpha * 0.2})`,
                    borderColor: `rgba(245, 158, 11, ${alpha})`,
                    borderWidth: thickness,
                    depth: 10,
                }
            );
        }

        // Keep only non-expired animations
        this.effectsState.joinEffects = remaining;
    }
}