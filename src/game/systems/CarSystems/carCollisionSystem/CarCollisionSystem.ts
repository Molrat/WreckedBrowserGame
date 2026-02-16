import { EventBus } from "@/game/events/EventBus";
import { isCollidableCar } from "@/game/queries/CollidableCar/isCollidableCar";
import { ICollidableCar } from "@/game/queries/CollidableCar/ICollidableCar";
import { ICarCollisionComputer } from "./ICarCollisionComputer";
import { ISystem } from "@/game/systems/ISystem";
import { length } from "@/math/Vector2";
import type { GameState } from "@/game/state/GameState";

export class CarCollisionSystem implements ISystem {
  constructor(private collisionComputer: ICarCollisionComputer) {}

  update(state: GameState, eventBus: EventBus, dt: number): void {
    const cars = state.entities.filter(isCollidableCar);
    for (let i = 0; i < cars.length; i++) {
      for (let j = i + 1; j < cars.length; j++) {
        this.handlePair(cars[i], cars[j], eventBus);
      }
    }
  }

  private handlePair(carA: ICollidableCar, carB: ICollidableCar, eventBus: EventBus): void {
    const manifold = this.collisionComputer.detectCollision(carA, carB);
    if (!manifold) return;

    const result = this.collisionComputer.resolveCollision(carA, carB, manifold);
    if (result) {
      carA.impulses.push({ impulse: result.impulseOnA, localContactPoint: result.contactPointLocalA });
      carB.impulses.push({ impulse: result.impulseOnB, localContactPoint: result.contactPointLocalB });
      carA.health = Math.max(0, carA.health - result.carADamage);
      carB.health = Math.max(0, carB.health - result.carBDamage);
      eventBus.emit({
        type: 'CarCollision',
        position: { x: manifold.contactPoint.x, y: manifold.contactPoint.y },
        impulseMagnitude: length(result.impulseOnA),
      });
    }

    this.separateCars(carA, carB, manifold.normal, manifold.penetration);
  }

  private separateCars(
    carA: ICollidableCar, carB: ICollidableCar,
    normal: { x: number; y: number }, penetration: number
  ): void {
    const totalMass = carA.mass + carB.mass;
    const moveA = penetration * (carB.mass / totalMass);
    const moveB = penetration * (carA.mass / totalMass);
    carA.position.x -= normal.x * moveA;
    carA.position.y -= normal.y * moveA;
    carB.position.x += normal.x * moveB;
    carB.position.y += normal.y * moveB;
  }
}
