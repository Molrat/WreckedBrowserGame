import { Vector2 } from "@/math/Vector2";

export interface IDriveIntentSubComputer{
  compute(
    inputValue: number,      // 0..1
    velocity: Vector2            // m/s
  ): number
}