export interface IWheelTorqueParams {
  groundForceLongitudinal: number;  // force in wheel's forward direction (N)
  wheelRadius: number;              // m
  engineTorque: number;             // Nm (from throttle)
  brakeTorque: number;              // Nm
  wheelInertia: number;             // kg*m²
  currentOmega: number;             // current angular speed (rad/s)
  dt: number;                       // time step (s)
}
