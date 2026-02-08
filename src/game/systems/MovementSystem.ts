import type { GameState } from '@/game/state/GameState';
import { isMovable } from '@/game/queries/Movable/isMovable';
import { IMovable } from '@/game/queries/Movable/IMovable';
import { ISystem } from '@/game/systems/ISystem';
import { EventBus } from '@/game/events/EventBus';
import { rotate } from '@/math/Vector2';

export class MovementSystem implements ISystem {
  update(state: GameState, eventBus: EventBus, dt: number) {
    const movableEntities = state.entities.filter(isMovable);
    for (const e of movableEntities) {
      this.applyImpulses(e);
      this.applyForces(e, dt);
      this.integrate(e, dt);
      this.clearForcesAndImpulses(e);
    }
  }

  private applyImpulses(e: IMovable): void {
    for (const { impulse, localContactPoint } of e.impulses) {
      e.velocity.x += impulse.x / e.mass;
      e.velocity.y += impulse.y / e.mass;
      const worldContact = rotate(localContactPoint, e.orientation);
      const torque = worldContact.x * impulse.y - worldContact.y * impulse.x;
      e.angularVelocity += torque / e.momentOfInertia;
    }
  }

  private applyForces(e: IMovable, dt: number): void {
    let totalForceX = 0;
    let totalForceY = 0;
    let totalTorque = 0;
    for (const { force, localContactPoint } of e.forces) {
      totalForceX += force.x;
      totalForceY += force.y;
      const worldContact = rotate(localContactPoint, e.orientation);
      totalTorque += worldContact.x * force.y - worldContact.y * force.x;
    }
    e.velocity.x += (totalForceX / e.mass) * dt;
    e.velocity.y += (totalForceY / e.mass) * dt;
    e.angularVelocity += (totalTorque / e.momentOfInertia) * dt;
  }

  private integrate(e: IMovable, dt: number): void {
    e.position.x += e.velocity.x * dt;
    e.position.y += e.velocity.y * dt;
    e.orientation += e.angularVelocity * dt;
  }

  private clearForcesAndImpulses(e: IMovable): void {
    e.forces.length = 0;
    e.impulses.length = 0;
  }
}