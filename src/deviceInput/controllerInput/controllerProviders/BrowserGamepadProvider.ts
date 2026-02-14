import type { IGamepadProvider } from "./IGamepadProvider";
import type { GamepadState } from "../../../game/state/input/GamepadState";

export class BrowserGamepadProvider implements IGamepadProvider {
  getGamepads(): GamepadState[] {
    const has = typeof navigator !== 'undefined' && 'getGamepads' in navigator;
    if (has && typeof navigator.getGamepads === 'function') {
      const padsFromNavigator = navigator.getGamepads();
      return padsFromNavigator.filter(p => !!p)
        .map(p => this.toControllerState(p));
    }    
    return [];
  }

  private toControllerState(pad: Gamepad): GamepadState {
    return {
      id: pad.index.toString(),
      leftStick: {
        x: pad.axes?.[0] ?? 0,
        y: -(pad.axes?.[1] ?? 0),
      },
      rightStick: {
        x: pad.axes?.[2] ?? 0,
        y: -(pad.axes?.[3] ?? 0),
      },
      leftTrigger: pad.buttons?.[6]?.value ?? 0,
      rightTrigger: pad.buttons?.[7]?.value ?? 0,
      triangle: !!pad.buttons?.[3]?.pressed,
      cross: !!pad.buttons?.[0]?.pressed,
      square: !!pad.buttons?.[2]?.pressed,
      circle: !!pad.buttons?.[1]?.pressed,
      l1: !!pad.buttons?.[4]?.pressed,
      r1: !!pad.buttons?.[5]?.pressed,
      l2: !!pad.buttons?.[6]?.pressed,
      r2: !!pad.buttons?.[7]?.pressed,
      l3: !!pad.buttons?.[10]?.pressed,
      r3: !!pad.buttons?.[11]?.pressed,
      dpadUp: !!pad.buttons?.[12]?.pressed,
      dpadDown: !!pad.buttons?.[13]?.pressed,
      dpadLeft: !!pad.buttons?.[14]?.pressed,
      dpadRight: !!pad.buttons?.[15]?.pressed,
      start: !!pad.buttons?.[9]?.pressed,
      select: !!pad.buttons?.[8]?.pressed,
      home: !!pad.buttons?.[16]?.pressed,
    };
  }
}
