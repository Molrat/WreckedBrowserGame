import { Vector2 } from "@/math/Vector2";

export interface IWheelForceParams {
  contactVelocityWorld: Vector2;
  carOrientation: number;
  steeringAngle: number;
  wheelAngularSpeed: number;
  wheelRadius: number;
  wheelInertia: number;
  normalForce: number;
  mu: number;
  engineTorque: number;
  brakeTorque: number;
  rollingResistance: number;
  tireGripBuildUp: number;
  tireGripDropOff: number;
  tireGripBuildUpLatScalar: number;
  tireGripDropOffLatScalar: number;
  maxGripLatScalar: number;
  dt: number;
}
