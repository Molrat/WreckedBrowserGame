import { Vector2, dotProduct, scale, add, perpendicular, length } from "@/math/Vector2";
import { ICarCollisionComputer } from "../ICarCollisionComputer";
import { CollisionResult } from "../CollisionResult";
import { ICollidableCar } from "@/game/queries/CollidableCar/ICollidableCar";
import { detectPolygonCollision } from "@/math/collision/detectPolygonCollision";
import { CollisionManifold } from "@/math/collision/CollisionManifold";
import { transformPolygonToWorld } from "@/math/collision/transformPolygon";

export interface CollisionConfig {
  restitution: number;      // 0 = inelastic, 1 = elastic
  damagePerMps: number;     // damage per m/s relative velocity
};

export class SimpleCarCollisionComputer implements ICarCollisionComputer {
  constructor(private config: CollisionConfig) {}

  detectCollision(carA: ICollidableCar, carB: ICollidableCar): CollisionManifold | null {
    const polygonA = transformPolygonToWorld(carA.shape, carA.position, carA.orientation);
    const polygonB = transformPolygonToWorld(carB.shape, carB.position, carB.orientation);
    return detectPolygonCollision(polygonA, polygonB);
  }

  resolveCollision(carA: ICollidableCar, carB: ICollidableCar, m: CollisionManifold): CollisionResult {
    const rA = { x: m.contactPoint.x - carA.position.x, y: m.contactPoint.y - carA.position.y };
    const rB = { x: m.contactPoint.x - carB.position.x, y: m.contactPoint.y - carB.position.y };

    const vA = add(carA.velocity, scale(perpendicular(rA), carA.angularVelocity));
    const vB = add(carB.velocity, scale(perpendicular(rB), carB.angularVelocity));
    const relVel = { x: vA.x - vB.x, y: vA.y - vB.y };
    const velAlongNormal = dotProduct(relVel, m.normal);

    if (velAlongNormal > 0) {
      return this.noCollisionResult(carA, carB);
    }

    const IA = this.momentOfInertia(carA);
    const IB = this.momentOfInertia(carB);
    const rAxN = rA.x * m.normal.y - rA.y * m.normal.x;
    const rBxN = rB.x * m.normal.y - rB.y * m.normal.x;

    const invMassSum = 1 / carA.mass + 1 / carB.mass + (rAxN * rAxN) / IA + (rBxN * rBxN) / IB;
    const j = -(1 + this.config.restitution) * velAlongNormal / invMassSum;
    const impulse = scale(m.normal, j);

    const relSpeed = length(relVel);
    const damage = relSpeed * this.config.damagePerMps;

    return {
      carAVelocity: add(carA.velocity, scale(impulse, 1 / carA.mass)),
      carBVelocity: add(carB.velocity, scale(impulse, -1 / carB.mass)),
      carAAngularVelocity: carA.angularVelocity + (rA.x * impulse.y - rA.y * impulse.x) / IA,
      carBAngularVelocity: carB.angularVelocity - (rB.x * impulse.y - rB.y * impulse.x) / IB,
      carADamage: damage,
      carBDamage: damage,
    };
  }

  private momentOfInertia(car: ICollidableCar): number {
    const l = car.lengthToFrontAxle + car.lengthToRearAxle;
    const w = car.trackHalfWidth * 2;
    return (car.mass * (l * l + w * w)) / 12;
  }

  private noCollisionResult(carA: ICollidableCar, carB: ICollidableCar): CollisionResult {
    return {
      carAVelocity: carA.velocity,
      carBVelocity: carB.velocity,
      carAAngularVelocity: carA.angularVelocity,
      carBAngularVelocity: carB.angularVelocity,
      carADamage: 0,
      carBDamage: 0,
    };
  }
}
