import type { Vector2 } from '../../../math/Vector2';
import { Positionable } from './Positionable';

export type Acceleratable = Positionable & {
  velocity: Vector2;
  acceleration: Vector2;
};
