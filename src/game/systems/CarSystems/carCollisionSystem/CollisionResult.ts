import { Vector2 } from "@/math/Vector2";

export type CollisionResult = {
  carAVelocity: Vector2;
  carBVelocity: Vector2;
  carAAngularVelocity: number;
  carBAngularVelocity: number;
  carADamage: number;
  carBDamage: number;
};
