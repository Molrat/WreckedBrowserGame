import { ITireForces } from "../slipForce/ITireForces";

/**
 * Clamps combined forces to friction ellipse boundary.
 * Ellipse equation: (Fx/fxPeak)^2 + (Fy/fyPeak)^2 <= 1
 */
export function applyFrictionEllipse(
  longForce: number,
  latForce: number,
  fxPeak: number,
  fyPeak: number
): ITireForces {
  const ellipseRadius = Math.sqrt(
    (longForce / fxPeak) ** 2 + (latForce / fyPeak) ** 2
  );

  if (ellipseRadius > 1) {
    return {
      longitudinalForce: longForce / ellipseRadius,
      lateralForce: latForce / ellipseRadius,
    };
  }

  return {
    longitudinalForce: longForce,
    lateralForce: latForce,
  };
}
