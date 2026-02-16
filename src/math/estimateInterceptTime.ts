/**
 * 1D intercept time approximation.
 * Solves: ½a·t² + (v_m - v_t)·t - d = 0
 * where d = distance, v_t = target recession speed, v_m = missile speed, a = missile acceleration.
 * Returns positive root or fallback d / v_m.
 */
export function estimateInterceptTime(
  distance: number,
  targetRecessionSpeed: number,
  missileSpeed: number,
  missileAcceleration: number
): number {
  const a = 0.5 * missileAcceleration;
  const b = missileSpeed - targetRecessionSpeed;
  const c = -distance;
  return solvePositiveRoot(a, b, c) ?? fallback(distance, missileSpeed);
}

function solvePositiveRoot(a: number, b: number, c: number): number | null {
  if (Math.abs(a) < 1e-6) return solveLinear(b, c);
  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;
  const sqrtDisc = Math.sqrt(disc);
  const t1 = (-b + sqrtDisc) / (2 * a);
  const t2 = (-b - sqrtDisc) / (2 * a);
  return pickSmallestPositive(t1, t2);
}

function solveLinear(b: number, c: number): number | null {
  if (Math.abs(b) < 1e-6) return null;
  const t = -c / b;
  return t > 0 ? t : null;
}

function pickSmallestPositive(t1: number, t2: number): number | null {
  const pos1 = t1 > 0 ? t1 : Infinity;
  const pos2 = t2 > 0 ? t2 : Infinity;
  const result = Math.min(pos1, pos2);
  return result === Infinity ? null : result;
}

function fallback(distance: number, missileSpeed: number): number {
  return missileSpeed > 0.01 ? distance / missileSpeed : 1;
}
