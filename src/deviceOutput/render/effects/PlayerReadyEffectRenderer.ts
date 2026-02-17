import { EffectsState } from "./EffectsState";
import { GameEvent } from "../../../game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "./IEffectRenderer";
import type { IScreenRenderAPI } from "../common/IScreenRenderAPI";
import { Vector2 } from "@/math/Vector2";

export class PlayerReadyEffectRenderer implements IEffectRenderer {
  private effectsState: EffectsState = {};

  constructor(private draw: IScreenRenderAPI) {}

  render(events: GameEvent[]) {
    const draw = this.draw;
    const now = performance.now();
    for (const ev of events) {
      if (ev.type === 'StartMenuPlayerReady') {
        const duration = 600; // ms
        const e = { slot: ev.slot, startTime: now, duration, x: ev.x, y: ev.y, width: ev.width, height: ev.height };
        (this.effectsState.readyEffects ??= []).push(e);
      }
    }

    const readyEffects = this.effectsState.readyEffects ?? [];

    const remaining: typeof readyEffects = [];
    for (const fx of readyEffects) {
      const t = (now - fx.startTime) / fx.duration;
      if (t >= 1) {
        continue; // expired
      }
      remaining.push(fx);

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
                fillColor: `rgba(34, 197, 94, ${alpha * 0.2})`,
                borderColor: `rgba(34, 197, 94, ${alpha})`,
                borderWidth: thickness,
                depth: 10,
            }
        );

      this.effectsState.readyEffects = remaining;
    }
  }
}
