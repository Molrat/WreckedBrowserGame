import type { IBoostable } from '@/game/queries/Boostable/IBoostable';
import { perpendicular, angleToUnitVector, scale } from '@/math/Vector2';

export function applyBoost(e: IBoostable): void {
  const { l1, r1, square } = e.currentGamepad;
  if (!l1 && !r1 && !square) return;

  const forward = angleToUnitVector(e.orientation);
  let impulse: { x: number; y: number } | null = null;

  if (l1) {
    // Left boost (sideways)
    const sideways = perpendicular(forward); // left of forward
    impulse = scale(sideways, 1 * e.boostImpulse);
  } else if (r1) {
    // Right boost (sideways)
    const sideways = perpendicular(forward); // left of forward
    impulse = scale(sideways, -1 * e.boostImpulse);
  } else if (square) {
    // Backwards boost
    impulse = scale(forward, -1 * e.boostImpulse);
  }

  if (impulse) {
    e.impulses.push({ impulse, localContactPoint: { x: 0, y: 0 } });
    e.boostCooldown = e.boostCooldownMax;
  }
}
