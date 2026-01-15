export interface IThrottleIntentConfig {
  deadZone: number;          // 0..1
  responseCurve: number;     // >= 1
  maxSpeed: number;          // m/s (for shaping)
  highSpeedLimit: number;    // 0..1 (throttle cap at max speed)
}