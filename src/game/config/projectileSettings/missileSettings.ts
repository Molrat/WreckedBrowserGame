import { ProjectileSettings } from "./ProjectileSettings";

const halfL = 1;
const halfW = 0.3;

export const missileSettings: ProjectileSettings = {
  projectileType: 'missile',
  shape: [
    { x: -halfL, y: -halfW },
    { x: halfL * 0.5, y: -halfW },
    { x: halfL, y: 0 },
    { x: halfL * 0.5, y: halfW },
    { x: -halfL, y: halfW },
  ],
  spawnOffset: halfL,
  speed: 0,
  speedRelativeToPlayer: true,
  health: 1,
  mass: 5,
  momentOfInertia: 2,
  borderWidth: 1,
  fillColor: '#ff2200',
  borderColor: '#ff8800',
  depth: 5,
  damage: 10,
  impulseMagnitude: 6000,
  lifetime: 8,
  recoil: 4000,
  destroyOnHit: true,
  fades: false,
  angularSpeed: 0,
  randomizeAngularDirection: false,
  isHeatSeeking: true,
  launchImpulse: 100,
};
