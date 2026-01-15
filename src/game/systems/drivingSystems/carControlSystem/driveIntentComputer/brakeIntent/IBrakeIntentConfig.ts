export interface IBrakeIntentConfig {
  deadZone: number;          // 0..1
  responseCurve: number;     // < 1 = aggressive bite
  lowSpeedReduction: number;// 0..1
  lowSpeedThreshold: number;// m/s
}