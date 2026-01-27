import type { GameState } from "@/game/state/GameState";
import { IRenderer } from "@/deviceOutput/render/IRenderer";
import type { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import type { IRenderable } from "@/game/queries/Renderable/IRenderable";
import type { Vector2 } from "@/math/Vector2";

const TIRE_LENGTH = 0.7;
const TIRE_WIDTH = 0.25;

// Tire shape oriented with forward=+X (length along X axis)
const TIRE_SHAPE: Vector2[] = [
  { x: -TIRE_LENGTH / 2, y: -TIRE_WIDTH / 2 },
  { x: TIRE_LENGTH / 2, y: -TIRE_WIDTH / 2 },
  { x: TIRE_LENGTH / 2, y: TIRE_WIDTH / 2 },
  { x: -TIRE_LENGTH / 2, y: TIRE_WIDTH / 2 },
];

export class TireRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    const cars = state.entities.filter(isWithCarPhysics);
    for (const car of cars) {
      this.drawTires(draw, car);
    }
  }

  // Standard math: forward=+X, left=+Y, rotation counterclockwise
  private wheelCenter(car: { position: Vector2; orientation: number }, offsetX: number, offsetY: number): Vector2 {
    const cos = Math.cos(car.orientation);
    const sin = Math.sin(car.orientation);
    return {
      x: car.position.x + cos * offsetX - sin * offsetY,
      y: car.position.y + sin * offsetX + cos * offsetY,
    };
  }

  private colorFromSlip(sLong: number, sLat: number): string {
    const m = Math.max(0, Math.min(1, Math.abs(sLong) / 100 + Math.abs(sLat) / 100));
    const r = Math.round(255 * m);
    const g = Math.round(255 * (1 - m));
    return `rgb(${r},${g},0)`;
  }

  private createTire(position: Vector2, orientation: number, fillColor: string): IRenderable {
    return { position, orientation, shape: TIRE_SHAPE, fillColor, borderColor: null, borderWidth: null };
  }

  private drawTires(d: ICameraRenderAPI, car: any): void {
    const halfTrack = car.trackHalfWidth;
    const frontAngle = car.orientation + (car.frontWheelAngle || 0);
    const rearAngle = car.orientation;

    // Forward=+X, Left=+Y, Right=-Y
    const FL = this.wheelCenter(car, car.lengthToFrontAxle, +halfTrack);
    const FR = this.wheelCenter(car, car.lengthToFrontAxle, -halfTrack);
    const RL = this.wheelCenter(car, -car.lengthToRearAxle, +halfTrack);
    const RR = this.wheelCenter(car, -car.lengthToRearAxle, -halfTrack);

    d.drawPolygon(this.createTire(FL, frontAngle, this.colorFromSlip(car.slipLongFL, car.slipLatFL)));
    d.drawPolygon(this.createTire(FR, frontAngle, this.colorFromSlip(car.slipLongFR, car.slipLatFR)));
    d.drawPolygon(this.createTire(RL, rearAngle, this.colorFromSlip(car.slipLongRL, car.slipLatRL)));
    d.drawPolygon(this.createTire(RR, rearAngle, this.colorFromSlip(car.slipLongRR, car.slipLatRR)));
  }
}
