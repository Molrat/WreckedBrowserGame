import { Vector2, add, scale } from "@/math/Vector2";
import { direction, perpendicular, dotProduct } from "../vectorHelpers";
import { computeSlipBasedForce } from "../slipForce/computeSlipBasedForce";
import { computeStaticFriction } from "../staticFriction/computeStaticFriction";
import { computeBlendFactor } from "../staticFriction/computeBlendFactor";
import { blendForces } from "../staticFriction/blendForces";
import { applyFrictionEllipse } from "../frictionEllipse/applyFrictionEllipse";
import { IWheelForceResult } from "./IWheelForceResult";
import { IWheelForceParams } from "./IWheelForceParams";

export function computeWheelForce(p: IWheelForceParams): IWheelForceResult {
  const wheelYaw = p.carOrientation + p.steeringAngle;
  const forwardVector = direction(wheelYaw);
  const sideVector = perpendicular(forwardVector);
  const forwardSpeed = dotProduct(p.contactVelocityWorld, forwardVector);
  const sideSpeed = dotProduct(p.contactVelocityWorld, sideVector);

  const wheelSurfaceSpeed = p.wheelAngularSpeed * p.wheelRadius;
  const slipRatio = (wheelSurfaceSpeed - forwardSpeed) /
    Math.max(Math.abs(forwardSpeed), Math.abs(wheelSurfaceSpeed), 4);
  const refSpeedLat = Math.max(Math.abs(forwardSpeed), 2);
  const slipAngle = Math.atan2(sideSpeed, refSpeedLat);

  const slipForce = computeSlipBasedForce({
    slipRatio, slipAngle,
    mu: p.mu, normalForce: p.normalForce,
    tireGripBuildUp: p.tireGripBuildUp, tireGripDropOff: p.tireGripDropOff,
    tireGripBuildUpLatScalar: p.tireGripBuildUpLatScalar,
    tireGripDropOffLatScalar: p.tireGripDropOffLatScalar,
    maxGripLatScalar: p.maxGripLatScalar,
  });

  const staticResult = computeStaticFriction(
    p.engineTorque, p.brakeTorque, p.wheelRadius, p.normalForce,
    p.mu, p.wheelAngularSpeed, forwardSpeed, sideSpeed
  );

  const blend = computeBlendFactor(forwardSpeed);
  const longRaw = blendForces(staticResult.longitudinalForce, slipForce.longitudinalForce, blend);
  const latRaw = blendForces(staticResult.lateralForce, slipForce.lateralForce, blend);

  const fxPeak = p.mu * p.normalForce;
  const fyPeak = fxPeak * p.maxGripLatScalar;
  const clamped = applyFrictionEllipse(longRaw, latRaw, fxPeak, fyPeak);

  const forceWorld = add(
    scale(forwardVector, clamped.longitudinalForce),
    scale(sideVector, clamped.lateralForce)
  );

  const slipReactionTorque = -clamped.longitudinalForce * p.wheelRadius;
  const tireReactionTorque = blendForces(staticResult.reactionTorque, slipReactionTorque, blend);
  const rollingResistanceTorque = -Math.sign(p.wheelAngularSpeed) * p.rollingResistance * p.wheelRadius * 0.25;
  const viscousTorque = -2.0 * p.wheelAngularSpeed; //stablizing forces at low speeds
  const netTorque = p.engineTorque - p.brakeTorque + tireReactionTorque + rollingResistanceTorque + viscousTorque;

  let newAngularSpeed = p.wheelAngularSpeed + (netTorque / p.wheelInertia) * p.dt;
  if (Math.abs(newAngularSpeed) < 0.1 && p.engineTorque === 0) {
    newAngularSpeed = 0;
  }

  return {
    forceWorld,
    newAngularSpeed,
    slipRatioAbs: Math.min(Math.abs(slipRatio), 1),
    slipAngleAbs: Math.min(Math.abs(slipAngle), 1),
  };
}
