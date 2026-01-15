declare interface HID {
  addEventListener(type: 'connect' | 'disconnect', listener: (ev: HIDConnectionEvent) => void): void;
  removeEventListener(type: 'connect' | 'disconnect', listener: (ev: HIDConnectionEvent) => void): void;
  getDevices(): Promise<HIDDevice[]>;
  requestDevice(options: { filters: Array<{ vendorId?: number; productId?: number }> }): Promise<HIDDevice[]>;
}
