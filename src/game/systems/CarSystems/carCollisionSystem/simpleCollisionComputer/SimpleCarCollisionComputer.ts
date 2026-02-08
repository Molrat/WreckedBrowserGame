import { Vector2, dotProduct, scale, add, perpendicular, length, subtract, rotate } from "@/math/Vector2";
import { ICarCollisionComputer } from "../ICarCollisionComputer";
import { CollisionResult } from "../CollisionResult";
import { ICollidableCar } from "@/game/queries/CollidableCar/ICollidableCar";
import { detectPolygonCollision } from "@/math/collision/detectPolygonCollision";
import { CollisionManifold } from "@/math/collision/CollisionManifold";
import { transformPolygonToWorld } from "@/math/collision/transformPolygon";

export interface CollisionConfig {
  restitution: number;      // 0 = inelastic, 1 = elastic
  friction: number;          // tangential friction at contact (0-1)
  damagePerMps: number;     // damage per m/s relative velocity
};

export class SimpleCarCollisionComputer implements ICarCollisionComputer {
  constructor(private config: CollisionConfig) {}

  detectCollision(carA: ICollidableCar, carB: ICollidableCar): CollisionManifold | null {
    const polygonA = transformPolygonToWorld(carA.shape, carA.position, carA.orientation);
    const polygonB = transformPolygonToWorld(carB.shape, carB.position, carB.orientation);
    return detectPolygonCollision(polygonA, polygonB);
  }

  resolveCollision(carA: ICollidableCar, carB: ICollidableCar, m: CollisionManifold): CollisionResult | null {
    const rA = subtract(m.contactPoint, carA.position);
    const rB = subtract(m.contactPoint, carB.position);

    const vA = add(carA.velocity, scale(perpendicular(rA), carA.angularVelocity));
    const vB = add(carB.velocity, scale(perpendicular(rB), carB.angularVelocity));
    const relVel = subtract(vA, vB);
    const velAlongNormal = dotProduct(relVel, m.normal);

    if (velAlongNormal > 0) return null;

    const IA = carA.momentOfInertia;
    const IB = carB.momentOfInertia;

    // Normal impulse
    const rAxN = rA.x * m.normal.y - rA.y * m.normal.x;
    const rBxN = rB.x * m.normal.y - rB.y * m.normal.x;
    const invMassN = 1 / carA.mass + 1 / carB.mass + (rAxN * rAxN) / IA + (rBxN * rBxN) / IB;
    const jN = -(1 + this.config.restitution) * velAlongNormal / invMassN;

    // Tangential (friction) impulse
    const tangent: Vector2 = { x: -m.normal.y, y: m.normal.x };
    const velAlongTangent = dotProduct(relVel, tangent);
    const rAxT = rA.x * tangent.y - rA.y * tangent.x;
    const rBxT = rB.x * tangent.y - rB.y * tangent.x;
    const invMassT = 1 / carA.mass + 1 / carB.mass + (rAxT * rAxT) / IA + (rBxT * rBxT) / IB;
    let jT = -velAlongTangent / invMassT;
    const maxFriction = this.config.friction * Math.abs(jN);
    jT = Math.max(-maxFriction, Math.min(maxFriction, jT));

    const totalImpulse = add(scale(m.normal, jN), scale(tangent, jT));
    const localA = rotate(rA, -carA.orientation);
    const localB = rotate(rB, -carB.orientation);

    return {
      impulseOnA: totalImpulse,
      impulseOnB: scale(totalImpulse, -1),
      contactPointLocalA: localA,
      contactPointLocalB: localB,
      carADamage: length(relVel) * this.config.damagePerMps,
      carBDamage: length(relVel) * this.config.damagePerMps,
    };
  }
}
