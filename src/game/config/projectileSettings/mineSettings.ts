import { ProjectileSettings } from "./ProjectileSettings";

const OCT_R = 1.0;
const A = OCT_R * Math.cos(Math.PI / 8);
const B = OCT_R * Math.sin(Math.PI / 8);
const B_2 = B / 2;
const A_long = A * 8;

export const mineSettings: ProjectileSettings = {
  projectileType: 'mine',
  shape: [
    { x: A, y: B }, { x: B, y: A },
    { x: B_2, y: A }, { x: B_2, y: A_long },
    { x: -B_2, y: A_long }, { x: -B_2, y: A },
    { x: -B, y: A }, { x: -A, y: B },
    { x: -A, y: -B }, { x: -B, y: -A },
    { x: B, y: -A }, { x: A, y: -B },
  ],
  spawnOffset: 0,
  speed: 0,
  speedRelativeToPlayer: false,
  health: 1,
  mass: 50,
  momentOfInertia: 10,
  borderWidth: 2,
  fillColor: '#1a0a2a',
  borderColor: '#ff00ff',
  depth: 1,
  damage: 25,
  impulseMagnitude: 20000,
  lifetime: 30,
  recoil: 0,
  destroyOnHit: true,
  fades: false,
  angularSpeed: Math.PI * 2 / 3,
  randomizeAngularDirection: true,
  isHeatSeeking: false,
  launchImpulse: 0,
};
