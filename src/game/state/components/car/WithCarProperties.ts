export type WithCarProperties = {
  mass: number;

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
  tireGripBuildUp: number;           // longitudinal stiffness (how fast grip builds with slip)
  tireGripDropOff: number;           // longitudinal falloff (fraction, higher = more drop after peak)
  tireGripBuildUpLatScalar: number;  // lateral stiffness = buildUp * this
  tireGripDropOffLatScalar: number;  // lateral dropOff = dropOff * this
  maxGripLatScalar: number;          // lateral peak grip multiplier (>1 = more cornering than traction grip)

  tireGripFrontScalar: number;
  tireGripRearScalar: number;

  rollingResistance: number;
  airDragCoefficient: number;
}