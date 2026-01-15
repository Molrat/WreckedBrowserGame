export const WORLD = {
  width: 800,
  height: 600,
  friction: 0.98,
};

export const STEERING_INTENT = {
  maxSteeringAngleLowSpeed: degToRad(35),
  maxSteeringAngleHighSpeed: degToRad(12),
  highSpeedThreshold: 30,      // ~108 km/h

  deadZone: 0.05,
  responseCurve: 2.2
};

function degToRad(arg0: number) {
  return arg0 * (Math.PI / 180);
}
