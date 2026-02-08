import { Vector2 } from "@/math/Vector2";

// Parameters for computing ground force in wheel's local frame
// +x = lateral (right), +y = longitudinal (forward)
export interface IWheelForceParams {
  velocityInWheelFrame: Vector2;  // contact point velocity in wheel frame
  wheelAngularSpeed: number;       // rad/s
  wheelRadius: number;             // m
  normalForce: number;             // N
  mu: number;                      // friction coefficient
  longitudalStiffness: number;
  lateralStiffness: number;
}
