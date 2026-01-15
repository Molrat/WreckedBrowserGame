import type { IGamepadProvider } from "../IGamepadProvider";
import type { GamepadState } from "../../../../game/state/input/GamepadState";

export class WebHIDGamepadProvider implements IGamepadProvider {
  private states = new Map<number, GamepadState>();

  constructor() {
    if (typeof navigator !== 'undefined') {
      const hid = (navigator as NavigatorWithHID).hid;
      hid.addEventListener('connect', (e: HIDConnectionEvent) => {
        this.attachDevice(e.device);
      });
      hid.addEventListener('disconnect', (e: HIDConnectionEvent) => {
        this.states.delete(e.device.productId);
      });
      hid.getDevices().then((devices: HIDDevice[]) => {
        devices.forEach((d: HIDDevice) => this.attachDevice(d));
      });
    }
  }

  getGamepads(): GamepadState[] {
    return Array.from(this.states.values());
  }

  private attachDevice(device: HIDDevice): void {
    device.addEventListener('inputreport', (ev: HIDInputReportEvent) => {
      const s = this.parseReport(device.productId.toString(), ev.data);
      this.states.set(device.productId, s);
    });
  }

  private parseReport(id: string, data: DataView): GamepadState {
    const b0 = data.byteLength > 0 ? data.getUint8(0) : 0;
    const b1 = data.byteLength > 1 ? data.getUint8(1) : 0;
    const lt = data.byteLength > 2 ? data.getUint8(2) / 255 : 0;
    const rt = data.byteLength > 3 ? data.getUint8(3) / 255 : 0;
    const lx = data.byteLength > 4 ? (data.getUint8(4) - 128) / 127 : 0;
    const ly = data.byteLength > 5 ? (data.getUint8(5) - 128) / 127 : 0;
    const rx = data.byteLength > 6 ? (data.getUint8(6) - 128) / 127 : 0;
    const ry = data.byteLength > 7 ? (data.getUint8(7) - 128) / 127 : 0;

    return {
      id,
      leftStick: { x: lx, y: ly },
      rightStick: { x: rx, y: ry },
      leftTrigger: lt,
      rightTrigger: rt,
      triangle: !!(b0 & 0x08),
      cross: !!(b0 & 0x01),
      square: !!(b0 & 0x04),
      circle: !!(b0 & 0x02),
      l1: !!(b0 & 0x10),
      r1: !!(b0 & 0x20),
      l2: !!(b0 & 0x40),
      r2: !!(b0 & 0x80),
      l3: !!(b1 & 0x01),
      r3: !!(b1 & 0x02),
      dpadUp: !!(b1 & 0x10),
      dpadDown: !!(b1 & 0x40),
      dpadLeft: !!(b1 & 0x80),
      dpadRight: !!(b1 & 0x20),
      start: !!(b1 & 0x08),
      select: !!(b1 & 0x04),
      home: !!(b1 & 0x16),
    };
  }
}
