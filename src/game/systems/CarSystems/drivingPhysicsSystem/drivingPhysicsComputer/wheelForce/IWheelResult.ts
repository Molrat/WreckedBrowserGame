import { Vector2 } from "@/math/Vector2";

export interface IWheelResult {
  forceWorld: Vector2;       // force on car from this wheel (world frame)
  newAngularSpeed: number;   // updated omega after torques applied
  slipRatio: number;         // for debugging/visualization
  slipAngle: number;         // for debugging/visualization
}
