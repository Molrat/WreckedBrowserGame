import { ProjectileSettings } from "./ProjectileSettings";
import { Vector2 } from "@/math/Vector2";

const radius = 0.8;
const segments = 12;

function buildCircleShape(r: number, n: number): Vector2[] {
  const points: Vector2[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (2 * Math.PI * i) / n;
    points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
  }
  return points;
}

export const cannonballSettings: ProjectileSettings = {
  projectileType: 'cannonball',
  shape: buildCircleShape(radius, segments),
  spawnOffset: radius,
  speed: 60,
  speedRelativeToPlayer: true,
  health: 1,
  mass: 20,
  momentOfInertia: 5,
  borderWidth: 2,
  fillColor: '#3a3a0a',
  borderColor: '#ffdd00',
  depth: 5,
  damage: 15,
  impulseMagnitude: 6000,
  lifetime: 4,
  recoil: 6000,
  destroyOnHit: true,
  fades: false,
  angularSpeed: 0,
  randomizeAngularDirection: false,
  isHeatSeeking: false,
  launchImpulse: 0,
};
