import { Vector2 } from "@/math/Vector2";
import { Positionable } from "../Positionable";
import { WithCarProperties } from "./WithCarProperties";
import { withCarControls } from "./WithCarControls";

export type WithCarState = Positionable & WithCarProperties & withCarControls & {
  velocity: Vector2;          // m/s (world space)
  angularVelocity: number; // rad/s
  tiltAngle: number;      // rad
  frontWheelAngle: number; // rad, steering angle of front wheels
  // Wheel angular speeds (rad/s)
  omegaFL: number;
  omegaFR: number;
  omegaRL: number;
  omegaRR: number;
  // Slip (for debugging/visualization)
  slipLongFL: number;
  slipLongFR: number;
  slipLongRL: number;
  slipLongRR: number;
  slipLatFL: number;
  slipLatFR: number;
  slipLatRL: number;
  slipLatRR: number;
  // Per-wheel resultant ground forces in world space (N)
  forceFL: Vector2;
  forceFR: Vector2;
  forceRL: Vector2;
  forceRR: Vector2;
};