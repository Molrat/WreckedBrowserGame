import type { ISystem } from '@/game/systems/ISystem';
import type { GameState } from '@/game/state/GameState';
import type { EventBus } from '@/game/events/EventBus';
import { isCarousel } from '@/game/queries/Carousel/isCarousel';
import type { ICarousel } from '@/game/queries/Carousel/ICarousel';
import { isCollidableCar } from '@/game/queries/CollidableCar/isCollidableCar';
import type { ICollidableCar } from '@/game/queries/CollidableCar/ICollidableCar';
import { detectPolygonCollision } from '@/math/collision/detectPolygonCollision';
import { transformPolygonToWorld } from '@/math/collision/transformPolygon';
import { subtract, dotProduct, scale, rotate } from '@/math/Vector2';

const RESTITUTION = 0.4;

export class CarouselCollisionSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    const carousels = state.entities.filter(isCarousel);
    const cars = state.entities.filter(isCollidableCar);
    for (const carousel of carousels) {
      for (const car of cars) {
        this.handlePair(carousel, car);
      }
    }
  }

  private handlePair(carousel: ICarousel, car: ICollidableCar): void {
    const carouselPoly = transformPolygonToWorld(carousel.shape, carousel.position, carousel.orientation);
    const carPoly = transformPolygonToWorld(car.shape, car.position, car.orientation);
    const manifold = detectPolygonCollision(carouselPoly, carPoly);
    if (!manifold) return;

    car.position.x += manifold.normal.x * manifold.penetration;
    car.position.y += manifold.normal.y * manifold.penetration;

    const r = subtract(manifold.contactPoint, car.position);
    const vAtContact = {
      x: car.velocity.x - car.angularVelocity * r.y,
      y: car.velocity.y + car.angularVelocity * r.x,
    };
    const vAlongNormal = dotProduct(vAtContact, manifold.normal);
    if (vAlongNormal >= 0) return;

    const rCrossN = r.x * manifold.normal.y - r.y * manifold.normal.x;
    const invMass = 1 / car.mass + (rCrossN * rCrossN) / car.momentOfInertia;
    const jN = -(1 + RESTITUTION) * vAlongNormal / invMass;

    car.impulses.push({
      impulse: scale(manifold.normal, jN),
      localContactPoint: rotate(r, -car.orientation),
    });
  }
}
