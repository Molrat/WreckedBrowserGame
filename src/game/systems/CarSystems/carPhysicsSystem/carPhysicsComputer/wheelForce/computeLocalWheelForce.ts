import { add, scale, Vector2, length } from "@/math/Vector2";
import { IWheelForceParams } from "./IWheelForceParams";

/**
 * Computes ground force in wheel's local frame of reference.
 * +x = lateral (right), +y = longitudinal (forward)
 * 
 * TODO: Implement tire model (slip ratio, slip angle, combined slip)
 */
export function computeLocalWheelForce(params: IWheelForceParams): Vector2 {
  // step 1: compute slip vector:
  const relativeVelocity = add(params.velocityInWheelFrame, {
    x: 0,
    y: -params.wheelAngularSpeed * params.wheelRadius,
  });
  const normalizedLocalForce = LocalVelocityToNormalizedForce(relativeVelocity, params.longitudalStiffness);
  const scaledForce = scale(normalizedLocalForce, params.normalForce * params.mu);
  return scaledForce;
}


function LocalVelocityToNormalizedForce(vel: Vector2, stiffness: number) : Vector2 {
  // Placeholder: simple proportional model with saturation
  // k controls slip stiffness - lower values = more slip before max force
  const k = stiffness; // reduced to prevent oscillation
  const raw: Vector2 = {
    x: -1  * k * (0.01 * vel.x),
    y: -1 * k * (0.01 * vel.y),
  };
  
  // Clamp magnitude to 1 (friction circle limit)
  const mag = Math.hypot(raw.x, raw.y);
  if (mag > 1) {
    return { x: raw.x / (2*mag), y: raw.y / (2 * mag) };
  }
  return raw;
}
