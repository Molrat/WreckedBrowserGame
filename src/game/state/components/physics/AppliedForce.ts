import type { Vector2 } from "@/math/Vector2";

export type AppliedForce = {
  force: Vector2;               // force in world coordinates (N)
  localContactPoint: Vector2;   // relative to object's frame of reference (m)
};
