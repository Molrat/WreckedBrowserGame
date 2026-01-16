import { IRenderer } from "../../IRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IRenderAPI } from "../../common/IRenderAPI";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import { length } from "@/math/Vector2";

export class SpeedometerRenderer implements IRenderer {
  constructor(private draw: IRenderAPI) {}

  render(state: GameState): void {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null || state.ui.openMenu === 'start')) return;
    const cars = state.entities.filter(isWithCarPhysics);
    if (cars.length === 0) return;

    const car = cars[0];
    // Speed (m/s → km/h)
    const speedMs = length(car.velocity);
    const speedKmh = speedMs * 3.6;

    // Controls
    const throttlePct = Math.round(car.throttle * 100);
    const brakePct = Math.round(car.brake * 100);
    const handBrakePct = Math.round(car.handBrake * 100);
    const wheelDeg = Math.round((car.steeringWheelAngle * 180) / Math.PI);

    this.draw.clearCamera(); // UI: draw in screen space
    const pad = 12;
    const line = 18;
    const y = this.draw.height() - pad;
    const x = pad;
    this.draw.textDraw(`${speedKmh.toFixed(0)} km/h`, x, y, '#fff', '16px sans-serif');
    this.draw.textDraw(`Wheel: ${wheelDeg}°`, x, y - line, '#fff', '16px sans-serif');
    this.draw.textDraw(`Throttle: ${throttlePct}%`, x, y - line * 2, '#fff', '16px sans-serif');
    this.draw.textDraw(`Brake: ${brakePct}%`, x, y - line * 3, '#fff', '16px sans-serif');
    this.draw.textDraw(`Handbrake: ${handBrakePct}%`, x, y - line * 4, '#fff', '16px sans-serif');
  }
}
