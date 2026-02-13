import { Vector2 } from '@/math/Vector2';

export type Camera = {
  position: Vector2; // meters (center)
  velocity: Vector2; // meters/s (for smooth damping)
  width: number;     // meters
  height: number;    // meters
  widthVelocity: number;  // meters/s
  heightVelocity: number; // meters/s
};
