import type { Vector2 } from "@/math/Vector2";

export type AppliedImpulse = {
  impulse: Vector2;             // impulse in world coordinates (N·s)
  localContactPoint: Vector2;   // relative to object's frame of reference (m)
};
