import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { Vector2 } from "@/math/Vector2";
import {
  LASER_BEAM_LENGTH,
  LASER_BEAM_WIDTH,
  LASER_BEAM_LIFETIME,
  LASER_BEAM_DAMAGE,
  LASER_BEAM_IMPULSE,
  LASER_BEAM_FILL,
  LASER_BEAM_BORDER,
  LASER_BEAM_DEPTH,
} from "@/game/config/weaponConstants";

export function createLaserBeam(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2
): Projectile {
  const halfW = LASER_BEAM_WIDTH / 2;
  return {
    id: nextId(),
    health: 100,
    maxHealth: 100,
    position: { x: position.x, y: position.y },
    orientation,
    velocity: playerVelocity,
    angularVelocity: 0,
    mass: 1,
    momentOfInertia: 1,
    forces: [],
    impulses: [],
    shape: [
      { x: 0, y: -halfW },
      { x: LASER_BEAM_LENGTH, y: -halfW },
      { x: LASER_BEAM_LENGTH, y: halfW },
      { x: 0, y: halfW },
    ],
    fillColor: LASER_BEAM_FILL,
    borderColor: LASER_BEAM_BORDER,
    borderWidth: 1,
    depth: LASER_BEAM_DEPTH,
    damage: LASER_BEAM_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: LASER_BEAM_IMPULSE,
    destroyOnHit: false,
    lifetime: LASER_BEAM_LIFETIME,
    maxLifetime: LASER_BEAM_LIFETIME,
    fades: true,
  };
}
