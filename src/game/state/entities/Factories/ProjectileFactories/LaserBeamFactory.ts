import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { add, angleToUnitVector, scale, Vector2 } from "@/math/Vector2";
import {
  LASER_BEAM_LENGTH,
  LASER_BEAM_WIDTH,
  LASER_BEAM_LIFETIME,
  LASER_BEAM_DAMAGE,
  LASER_BEAM_IMPULSE,
  LASER_BEAM_FILL,
  LASER_BEAM_BORDER,
  LASER_BEAM_DEPTH,
  LASER_BEAM_SPEED,
  LASER_BEAM_RECOIL,
} from "@/game/config/weaponConstants";
import { FireResult } from "./FireResult";

export function createLaserBeam(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2
): FireResult {
  const halfW = LASER_BEAM_WIDTH / 2;
  const halfL = LASER_BEAM_LENGTH / 2;
  const laserBeamVelocity = add(playerVelocity, scale(angleToUnitVector(orientation), LASER_BEAM_SPEED));
  const spawnPos = add(position, scale(angleToUnitVector(orientation), halfL));
  
  const projectile: Projectile = {
    id: nextId(),
    health: 100,
    maxHealth: 100,
    position: { x: spawnPos.x, y: spawnPos.y },
    orientation,
    velocity: laserBeamVelocity,
    angularVelocity: 0,
    mass: 1,
    momentOfInertia: 1,
    forces: [],
    impulses: [],
    shape: [
      { x: -halfL, y: -halfW },
      { x: halfL, y: -halfW },
      { x: halfL, y: halfW },
      { x: -halfL, y: halfW },
    ],
    fillColor: LASER_BEAM_FILL,
    borderColor: LASER_BEAM_BORDER,
    borderWidth: 1,
    depth: LASER_BEAM_DEPTH,
    damage: LASER_BEAM_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: LASER_BEAM_IMPULSE,
    destroyOnHit: true,
    projectileType: 'laserBeam',
    lifetime: LASER_BEAM_LIFETIME,
    maxLifetime: LASER_BEAM_LIFETIME,
    fades: true,
  };
  return { projectile, recoil: LASER_BEAM_RECOIL };
}
