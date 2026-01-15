export interface ISteeringIntentConfig {
  maxSteeringAngleLowSpeed: number;   // radians
  maxSteeringAngleHighSpeed: number;  // radians
  highSpeedThreshold: number;         // m/s

  deadZone: number;                   // 0..1
  responseCurve: number;              // >= 1 (1 = linear, 2..3 = rally)
}