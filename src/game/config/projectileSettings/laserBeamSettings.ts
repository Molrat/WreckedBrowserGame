import { ProjectileSettings } from "./ProjectileSettings";

const halfL = 25;
const halfW = 0.5;

export const laserBeamSettings: ProjectileSettings = {
  projectileType: 'laserBeam',
  shape: [
    { x: -halfL, y: -halfW },
    { x: halfL, y: -halfW },
    { x: halfL, y: halfW },
    { x: -halfL, y: halfW },
  ],
  spawnOffset: halfL,
  speed: 300,
  speedRelativeToPlayer: true,
  health: 100,
  mass: 1,
  momentOfInertia: 1,
  borderWidth: 1,
  fillColor: '#ff00ff',
  borderColor: '#ff0080',
  depth: 5,
  damage: 50,
  impulseMagnitude: 10000,
  lifetime: 1,
  recoil: 8000,
  destroyOnHit: true,
  fades: true,
  angularSpeed: 0,
  randomizeAngularDirection: false,
  isHeatSeeking: false,
  launchImpulse: 0,
};
