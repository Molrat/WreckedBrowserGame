import { Vector2 } from '@/math/Vector2';

export type Camera = {
  position: Vector2; // meters (center)
  width: number;     // meters
  height: number;    // meters
};
