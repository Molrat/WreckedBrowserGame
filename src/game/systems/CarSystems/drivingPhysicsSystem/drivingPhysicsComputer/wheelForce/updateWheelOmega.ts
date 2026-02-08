import { IWheelTorqueParams } from "./IWheelTorqueParams";

/**
 * Updates wheel angular speed based on applied torques.
 * Torques: engine (accelerates), brake (decelerates), ground reaction (opposite of longitudinal force).
 */
export function updateWheelOmega(p: IWheelTorqueParams): number {
  // Ground reaction torque: opposite of longitudinal force on ground
  // If wheel pushes ground backward (positive force), ground pushes wheel forward = slows wheel
  const groundReactionTorque = -p.groundForceLongitudinal * p.wheelRadius;

  // Net torque on wheel
  const netTorque = p.engineTorque - p.brakeTorque + groundReactionTorque;

  // Angular acceleration
  const angularAccel = netTorque / p.wheelInertia;

  // New omega
  let newOmega = p.currentOmega + angularAccel * p.dt;

  // Prevent sign flip when nearly stopped and no throttle
  if (Math.abs(newOmega) < 0.1 && p.engineTorque === 0) {
    newOmega = 0;
  }

  return newOmega;
}

export interface staticForceParams {
  carAcceleration: number;
  wheelRadius: number;
  currentOmega: number;
  dt: number;
}
export function updateWheelOmegaStatic(p: staticForceParams): number {
  const angularAccel = (p.carAcceleration / p.wheelRadius);
  let newOmega = p.currentOmega + angularAccel * p.dt;
  return newOmega;
}
