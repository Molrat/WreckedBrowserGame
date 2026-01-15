import type { GamepadState } from "../../../game/state/input/GamepadState";

export interface IGamepadProvider {
  getGamepads(): GamepadState[];
}
