import { Vector2 } from "@/math/Vector2";

export type CollisionResult = {
  impulseOnA: Vector2;        // impulse to apply to car A (N·s)
  impulseOnB: Vector2;        // impulse to apply to car B (N·s)
  contactPointLocalA: Vector2; // contact point in A's local frame
  contactPointLocalB: Vector2; // contact point in B's local frame
  carADamage: number;
  carBDamage: number;
};
