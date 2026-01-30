/**
 * S-curve shape function: rises then falls with normalized slip input
 * S_raw(s) = (1 - exp(-k*s)) * exp(-alpha*k*s)
 */
export function shapeFunction(
  slip: number,
  stiffness: number,
  alpha: number
): number {
  const s = Math.abs(slip);
  return (1 - Math.exp(-stiffness * s)) * Math.exp(-alpha * stiffness * s);
}

/**
 * Computes normalized peak of shape function.
 * Peak occurs at s* = ln(1 + 1/alpha) / stiffness
 */
export function computeShapeMax(stiffness: number, alpha: number): number {
  const sPeak = Math.log(1 + 1 / alpha) / stiffness;
  return shapeFunction(sPeak, stiffness, alpha);
}
