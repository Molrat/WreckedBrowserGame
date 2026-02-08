import type { Vector2 } from '../../../math/Vector2';
import type { AppliedForce } from './physics/AppliedForce';
import type { AppliedImpulse } from './physics/AppliedImpulse';
import { Positionable } from './Positionable';

export type Movable = Positionable & {
  velocity: Vector2;
  angularVelocity: number;
  mass: number;
  momentOfInertia: number;
  forces: AppliedForce[];
  impulses: AppliedImpulse[];
};
