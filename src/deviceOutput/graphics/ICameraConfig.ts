export interface ICameraConfig {
  marginMeters: number;
  smoothTime: number;         // seconds for critically damped spring (lower = snappier)
  rearMarginFraction: number; // fraction of margin behind target (0–1)
  sideMarginFraction: number; // fraction of margin to sides of target (0–1)
}
