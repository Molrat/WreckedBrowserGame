export type WithCarProperties = {
  mass: number;

  centerOfMassOffset: number;
  lengthToFrontAxle: number;
  lengthToRearAxle: number;
  trackHalfWidth: number; // m
  wheelRadius: number;    // m

  maxSteeringAngle: number;
  maxSteeringWheelAngle: number;
  steeringResponse: number;
  steeringSpeedReductionK: number; // per m/s, reduces tire angle at speed

  engineForce: number;
  brakeForce: number;
  tireMu: number;           // friction coefficient
  tireStiffLong: number;    // N per m/s slip
  tireStiffLat: number;     // N per m/s slip

  tireGripFront: number;
  tireGripRear: number;
  driftGripMultiplier: number;

  rollingResistance: number;
  airDragCoefficient: number;
}