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
  tireStiffness: number;
  
  rollingResistance: number;
  airDragCoefficient: number;
}