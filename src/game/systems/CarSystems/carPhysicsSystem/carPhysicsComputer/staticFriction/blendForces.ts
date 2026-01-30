/**
 * Blends static and dynamic (slip-based) forces based on blend factor.
 * blend = 0: fully static, blend = 1: fully slip-based
 */
export function blendForces(
  staticForce: number,
  slipForce: number,
  blend: number
): number {
  return (1 - blend) * staticForce + blend * slipForce;
}
