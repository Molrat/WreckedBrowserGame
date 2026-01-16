export interface ISteeringIntentConfig {
  maxSteeringWheelAngle: number;      // radians (e.g., 540° = 3π)
  deadZone: number;                   // 0..1
  responseCurve: number;              // >= 1 (1 = linear, 2..3 = rally)
}