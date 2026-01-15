declare interface HIDDevice {
  vendorId: number;
  productId: number;
  productName: string;
  opened: boolean;
  open(): Promise<void>;
  close(): Promise<void>;
  addEventListener(type: 'inputreport', listener: (ev: HIDInputReportEvent) => void): void;
}
