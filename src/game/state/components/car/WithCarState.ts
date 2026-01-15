import { Vector2 } from "@/math/Vector2";
import { Positionable } from "../Positionable";
import { WithCarProperties } from "./WithCarProperties";
import { withCarControls } from "./WithCarControls";

export type WithCarState = Positionable & WithCarProperties & withCarControls & {
  velocity: Vector2;          // m/s (world space)
  angularVelocity: number; // rad/s
  // Traction state
  frontWheelsHaveTraction: boolean;
  rearWheelsHaveTraction: boolean;
};