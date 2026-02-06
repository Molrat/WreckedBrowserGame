import { ICollidableCar } from "@/game/queries/CollidableCar/ICollidableCar";
import { Vector2 } from "@/math/Vector2";
import { transformPolygonToWorld } from "@/math/collision/transformPolygon";

export function getCarPolygonWorld(car: ICollidableCar): Vector2[] {
  return transformPolygonToWorld(car.shape, car.position, car.orientation);
}
