export type WithCarProperties = {
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
  tireMu: number;                    // friction coefficient
  tireStiffness: number;             // not used with pacejka model (we use A B and C coefficients from constants)
  
  airDragCoefficient: number;
}