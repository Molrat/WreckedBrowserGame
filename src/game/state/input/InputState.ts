import { GamepadState } from "./GamepadState";

export type InputState = {
    previousGamepads: GamepadState[],
    gamePads: GamepadState[]
};