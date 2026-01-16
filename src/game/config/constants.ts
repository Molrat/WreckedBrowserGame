export const WORLD = {
  width: 800,
  height: 600,
  friction: 0.98,
};

export const HANDBRAKE_INTENT = {
  deadZone: 0.01,          // 0..1
  responseCurve: 0.5     // < 1 = aggressive bite
}

export const THROTTLE_INTENT = {
  deadZone: 0.01,          // 0..1
  responseCurve: 4,     // >= 1
  maxSpeed: 80,          // m/s (for shaping)
  highSpeedLimit: 100 
}

export const BRAKE_INTENT = {
  deadZone: 0.01,          // 0..1
  responseCurve: 0.5,     // < 1 = aggressive bite
  lowSpeedReduction: 0.3,// 0..1
  lowSpeedThreshold: 10// m/s
}

export const STEERING_INTENT = {
  maxSteeringWheelAngle: degToRad(540),
  deadZone: 0.05,
  responseCurve: 2.0
};

export const THROTTLE_CONTROL = {
  rampUpRate: 3,   // per second
  rampDownRate: 4, // per second
}

export const STEERING_CONTROL = {
  steeringRate: 6,     // rad/s
  centeringRate: 8     // rad/s
}

export const HANDBRAKE_CONTROL = {
  engageRate: 1.5,    // per second
  releaseRate: 1.5,   // per second
}
export const BRAKE_CONTROL = {
  applyRate: 3.0,    // per second
  releaseRate: 2.5,  // per second
}
function degToRad(arg0: number) {
  return arg0 * (Math.PI / 180);
}
