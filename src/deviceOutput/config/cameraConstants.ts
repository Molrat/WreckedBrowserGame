import { ICameraConfig } from "../render/ICameraConfig";

export const CAMERA_CONSTANTS: ICameraConfig = {
  marginMeters: 100,
  smoothTime: 0.5,            // seconds for critically damped spring
  rearMarginFraction: 0.1,   // fraction of margin behind target
  sideMarginFraction: 0.3,   // fraction of margin to sides of target
};
