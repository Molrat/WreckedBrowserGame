import { Vector2 } from "@/math/Vector2";

export interface IWheelForceResult {
  forceWorld: Vector2;
  newAngularSpeed: number;
  slipRatioAbs: number;
  slipAngleAbs: number;
}
