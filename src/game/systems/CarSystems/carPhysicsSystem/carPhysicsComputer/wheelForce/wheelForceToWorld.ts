import { Vector2, rotate } from "@/math/Vector2";

/**
 * Transforms force from wheel's local frame to world frame.
 * Wheel local: +x = lateral (right), +y = longitudinal (forward)
 * Standard: +x = forward, +y = left (90° counterclockwise from wheel local)
 */
export function wheelForceToWorld(
  localForce: Vector2,
  wheelWorldAngle: number
): Vector2 {
  return rotate(localForce, wheelWorldAngle - Math.PI / 2);
}
