import { GamepadState } from "../input/GamepadState";

export type Controllable ={
  controllerId: string;
  currentGamepad: GamepadState;
  previousGamepad: GamepadState;
}