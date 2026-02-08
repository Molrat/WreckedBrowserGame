import { Vector2 } from "@/math/Vector2";
import { WithCarProperties } from "./WithCarProperties";
import { withCarControls } from "./WithCarControls";

export type WithCarState = WithCarProperties & withCarControls & {
  tiltAngle: number;      // rad
  frontWheelAngle: number; // rad, steering angle of front wheels
  // Wheel angular speeds (rad/s)
  omegaFL: number;
  omegaFR: number;
  omegaRL: number;
  omegaRR: number;
  // Per-wheel resultant ground forces in world space (N)
  forceFL: Vector2;
  forceFR: Vector2;
  forceRL: Vector2;
  forceRR: Vector2;
};