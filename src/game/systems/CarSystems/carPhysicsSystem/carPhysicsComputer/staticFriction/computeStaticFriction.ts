import { IStaticFrictionResult } from "./IStaticFrictionResult";

/**
 * Computes static friction forces for a wheel at low speed.
 * Converts wheel torque to ground force, clamped by static friction.
 */
export function computeStaticFriction(
  engineTorque: number,
  brakeTorque: number,
  wheelRadius: number,
  normalForce: number,
  mu: number,
  wheelAngularSpeed: number,
  forwardSpeed: number,
  sideSpeed: number
): IStaticFrictionResult {
  // Maximum static friction force available
  const maxStaticForce = mu * normalForce;

  // Desired longitudinal force from wheel torque: F = torque / radius
  const netDriveTorque = engineTorque - brakeTorque;
  let desiredLongForce = netDriveTorque / wheelRadius;

  // If braking while moving, apply friction to oppose current motion
  if (brakeTorque > 0 && Math.abs(forwardSpeed) > 0.01) {
    const brakeForce = brakeTorque / wheelRadius;
    desiredLongForce = -Math.sign(forwardSpeed) * Math.min(brakeForce, maxStaticForce);
  }

  // Clamp longitudinal force by static friction
  const clampedLongForce = Math.max(-maxStaticForce, Math.min(maxStaticForce, desiredLongForce));

  // Lateral force: velocity damping to prevent drift at low speeds
  const lateralDamping = 50.0;
  let lateralForce = -sideSpeed * lateralDamping;
  lateralForce = Math.max(-maxStaticForce, Math.min(maxStaticForce, lateralForce));

  // Reaction torque: only the portion that was actually "consumed" by friction
  // If we requested more force than friction allows, excess torque spins the wheel
  const excessForce = Math.abs(desiredLongForce) - Math.abs(clampedLongForce);
  const consumedForce = Math.abs(desiredLongForce) - excessForce;
  const reactionTorque = -Math.sign(desiredLongForce) * consumedForce * wheelRadius;

  return {
    longitudinalForce: clampedLongForce,
    lateralForce: lateralForce,
    reactionTorque: reactionTorque,
  };
}
