declare interface HIDInputReportEvent extends Event {
  device: HIDDevice;
  reportId: number;
  data: DataView;
}
