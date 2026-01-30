import { V_STATIC, V_DYNAMIC } from "./StaticFrictionConstants";

/**
 * Computes blend factor for transitioning from static to dynamic friction.
 * Returns 0 when fully static, 1 when fully slip-based.
 */
export function computeBlendFactor(forwardSpeed: number): number {
  const absSpeed = Math.abs(forwardSpeed);
  if (absSpeed <= V_STATIC) return 0;
  if (absSpeed >= V_DYNAMIC) return 1;
  // Smooth hermite interpolation for gradual transition
  const t = (absSpeed - V_STATIC) / (V_DYNAMIC - V_STATIC);
  return t * t * (3 - 2 * t);
}
