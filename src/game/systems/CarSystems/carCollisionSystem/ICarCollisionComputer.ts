import { CollisionResult } from "./CollisionResult";
import { ICollidableCar } from "@/game/queries/CollidableCar/ICollidableCar";
import { CollisionManifold } from "@/math/collision/CollisionManifold";

export interface ICarCollisionComputer {
  detectCollision(carA: ICollidableCar, carB: ICollidableCar): CollisionManifold | null;
  resolveCollision(carA: ICollidableCar, carB: ICollidableCar, manifold: CollisionManifold): CollisionResult | null;
}
