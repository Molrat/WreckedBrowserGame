import { Vector2 } from "../Vector2";

export type CollisionManifold = {
  contactPoint: Vector2;
  normal: Vector2;
  penetration: number;
};
