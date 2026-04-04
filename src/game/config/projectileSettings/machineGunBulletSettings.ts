import { ProjectileSettings } from "./ProjectileSettings";

const halfW = 0.075;
const length = 0.4;

export const machineGunBulletSettings: ProjectileSettings = {
  projectileType: 'machineGunBullet',
  shape: [
    { x: 0, y: -halfW },
    { x: length, y: -halfW },
    { x: length, y: halfW },
    { x: 0, y: halfW },
  ],
  spawnOffset: length / 2,
  speed: 80,
  speedRelativeToPlayer: true,
  health: 1,
  mass: 0.05,
  momentOfInertia: 0.001,
  borderWidth: 1,
  fillColor: '#1a0a2a',
  borderColor: '#ffff00',
  depth: 5,
  damage: 4,
  impulseMagnitude: 3000,
  lifetime: 5,
  recoil: 0,
  destroyOnHit: true,
  fades: false,
  angularSpeed: 0,
  randomizeAngularDirection: false,
  isHeatSeeking: false,
  launchImpulse: 0,
};
