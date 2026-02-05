import type { GameState } from "@/game/state/GameState";
import { IRenderer } from "@/deviceOutput/render/IRenderer";
import type { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import type { IRenderable } from "@/game/queries/Renderable/IRenderable";
import type { Vector2 } from "@/math/Vector2";
import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";

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

  private createTire(position: Vector2, orientation: number): IRenderable {
    return { position, orientation, shape: TIRE_SHAPE, fillColor: '#222', borderColor: null, borderWidth: null, depth: 3 };
  }

  private drawTires(d: ICameraRenderAPI, car: ICarState): void {
    const halfTrack = car.trackHalfWidth;
    const frontAngle = car.orientation + (car.frontWheelAngle || 0);
    const rearAngle = car.orientation;

    // Forward=+X, Left=+Y, Right=-Y
    const FL = this.wheelCenter(car, car.lengthToFrontAxle, +halfTrack);
    const FR = this.wheelCenter(car, car.lengthToFrontAxle, -halfTrack);
    const RL = this.wheelCenter(car, -car.lengthToRearAxle, +halfTrack);
    const RR = this.wheelCenter(car, -car.lengthToRearAxle, -halfTrack);

    d.drawPolygon(this.createTire(FL, frontAngle));
    d.drawPolygon(this.createTire(FR, frontAngle));
    d.drawPolygon(this.createTire(RL, rearAngle));
    d.drawPolygon(this.createTire(RR, rearAngle));
  }
}
