export type WithCarProperties = {
  mass: number;
  inertia: number;

  wheelBase: number;
  centerOfMassOffset: number;

  maxSteeringAngle: number;
  maxSteeringWheelAngle: number;
  steeringResponse: number;

  engineForce: number;
  brakeForce: number;

  tireGripFront: number;
  tireGripRear: number;
  driftGripMultiplier: number;

  rollingResistance: number;
  airDragCoefficient: number;
}