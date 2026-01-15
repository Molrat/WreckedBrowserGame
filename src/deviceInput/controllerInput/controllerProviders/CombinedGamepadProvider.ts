import type { IGamepadProvider } from "./IGamepadProvider";
import type { GamepadState } from "../../../game/state/input/GamepadState";

export class CombinedGamepadProvider implements IGamepadProvider {
  constructor(private providers: ReadonlyArray<IGamepadProvider>) {}

  getGamepads(): GamepadState[] {
    for (const p of this.providers) {
      const list = p.getGamepads();
      if (list.length > 0) return list;
    }
    return [];
  }
}
