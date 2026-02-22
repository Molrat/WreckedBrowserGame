import { IScreenRenderer } from "@/deviceOutput/graphics/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import { length } from "@/math/Vector2";

export class SpeedometerRenderer implements IScreenRenderer {

  render(state: GameState, draw: IScreenRenderAPI): void {
    if (!(state.ui.openMenu === null || state.ui.openMenu === 'start')) return;
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

    const pad = 12;
    const line = 18;
    const y = draw.getHeight() - pad;
    const x = pad;
    draw.drawText(`${speedKmh.toFixed(0)} km/h`, { x, y }, '#fff', '16px sans-serif');
    draw.drawText(`Wheel: ${wheelDeg}°`, { x, y: y - line }, '#fff', '16px sans-serif');
    draw.drawText(`Throttle: ${throttlePct}%`, { x, y: y - line * 2 }, '#fff', '16px sans-serif');
    draw.drawText(`Brake: ${brakePct}%`, { x, y: y - line * 3 }, '#fff', '16px sans-serif');
    draw.drawText(`Handbrake: ${handBrakePct}%`, { x, y: y - line * 4 }, '#fff', '16px sans-serif');
  }
}
