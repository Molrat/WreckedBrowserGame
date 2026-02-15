import { Vector2, scale } from "@/math/Vector2";
import { angleToUnitVector, dotProduct } from "@/math/Vector2";

/**
 * Computes air drag force with orientation-dependent coefficient.
 * Drag increases when car is sideways (drifting).
 */
export function computeAirDrag(
  velocity: Vector2,
  orientation: number,
  baseDragCoeff: number
): Vector2 {
  const speed = Math.hypot(velocity.x, velocity.y);
  if (speed < 0.01) return { x: 0, y: 0 };

  let effectiveDrag = baseDragCoeff;
  if (speed > 0.1) {
    const carForward = angleToUnitVector(orientation);
    const velocityDir: Vector2 = { x: velocity.x / speed, y: velocity.y / speed };
    const alignmentCos = Math.abs(dotProduct(carForward, velocityDir));
    const sidewaysDragMultiplier = 2.5;
    effectiveDrag = baseDragCoeff * (alignmentCos + sidewaysDragMultiplier * (1 - alignmentCos));
  }

  const dragMagnitude = effectiveDrag * speed * speed;
  return scale(velocity, -dragMagnitude / speed);
}
