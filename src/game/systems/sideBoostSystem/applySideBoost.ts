import type { ISideBoostable } from '@/game/queries/SideBoostable/ISideBoostable';
import { perpendicular, angleToUnitVector, scale } from '@/math/Vector2';

export function applySideBoost(e: ISideBoostable): void {
  const left = e.currentGamepad.l1;
  const right = e.currentGamepad.r1;
  if (!left && !right) return;

  const forward = angleToUnitVector(e.orientation);
  const sideways = perpendicular(forward);  // points left of forward
  const direction = left ? 1 : -1;
  const impulse = scale(sideways, direction * e.sideBoostImpulse);

  e.impulses.push({ impulse, localContactPoint: { x: 0, y: 0 } });
  e.sideBoostCooldown = e.sideBoostCooldownMax;
}
