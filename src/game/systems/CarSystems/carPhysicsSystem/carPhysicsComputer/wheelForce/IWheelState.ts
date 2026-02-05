import { Vector2 } from "@/math/Vector2";

export interface IWheelState {
  localPosition: Vector2;    // position relative to car center (+x forward, +y left)
  steeringAngle: number;     // rad
  angularSpeed: number;      // rad/s (omega)
}
