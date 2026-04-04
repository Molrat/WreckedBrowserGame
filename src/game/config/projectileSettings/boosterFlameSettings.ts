import { ProjectileSettings } from "./ProjectileSettings";

const length = 0.6;
const halfW = 0.15;

export const boosterFlameSettings: ProjectileSettings = {
  projectileType: 'boosterFlame',
  shape: [
    { x: 0, y: -halfW },
    { x: length, y: 0 },
    { x: 0, y: halfW },
  ],
  spawnOffset: length / 2,
  speed: 30,
  speedRelativeToPlayer: true,
  health: 1,
  mass: 0.01,
  momentOfInertia: 0.001,
  borderWidth: 1,
  fillColor: '#ff4400',
  borderColor: '#ff8800',
  depth: 5,
  damage: 0,
  impulseMagnitude: 0,
  lifetime: 0.15,
  recoil: 6000,
  destroyOnHit: true,
  fades: true,
  angularSpeed: 0,
  randomizeAngularDirection: false,
  isHeatSeeking: false,
  launchImpulse: 0,
};
