import { Vector2 } from "../../../math/Vector2";

export type GamepadState = {
  id: String;
  // Axes
  leftStick: Vector2;       // x: -1..1, y: -1..1
  rightStick: Vector2;      // x: -1..1, y: -1..1
  leftTrigger: number;      // 0..1
  rightTrigger: number;     // 0..1

  // Buttons
  triangle: boolean;
  cross: boolean;
  square: boolean;
  circle: boolean;
  l1: boolean;
  r1: boolean;
  l2: boolean;
  r2: boolean;
  l3: boolean;
  r3: boolean;
  dpadUp: boolean;
  dpadDown: boolean;
  dpadLeft: boolean;
  dpadRight: boolean;
  start: boolean;
  select: boolean;
  home: boolean;
}