import { Vector2 } from '@/math/Vector2';

export interface IControllablePositionable {
  position: Vector2;
  currentGamepad: unknown; // presence indicates controllable; type details not needed here
}
