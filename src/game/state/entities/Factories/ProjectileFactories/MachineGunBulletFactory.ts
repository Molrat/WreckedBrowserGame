import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { Vector2, angleToUnitVector, scale, add } from "@/math/Vector2";
import {
  BULLET_LENGTH,
  BULLET_WIDTH,
  BULLET_SPEED,
  BULLET_LIFETIME,
  BULLET_DAMAGE,
  BULLET_IMPULSE,
  BULLET_FILL,
  BULLET_BORDER,
  BULLET_DEPTH,
} from "@/game/config/weaponConstants";

export function createMachineGunBullet(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2
): Projectile {
  const halfW = BULLET_WIDTH / 2;
  const bulletVel = add(playerVelocity, scale(angleToUnitVector(orientation), BULLET_SPEED));
  return {
    id: nextId(),
    health: 1,
    maxHealth: 1,
    position: { x: position.x, y: position.y },
    orientation,
    velocity: bulletVel,
    angularVelocity: 0,
    mass: 0.05,
    momentOfInertia: 0.001,
    forces: [],
    impulses: [],
    shape: [
      { x: 0, y: -halfW },
      { x: BULLET_LENGTH, y: -halfW },
      { x: BULLET_LENGTH, y: halfW },
      { x: 0, y: halfW },
    ],
    fillColor: BULLET_FILL,
    borderColor: BULLET_BORDER,
    borderWidth: 1,
    depth: BULLET_DEPTH,
    damage: BULLET_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: BULLET_IMPULSE,
    destroyOnHit: true,
    lifetime: BULLET_LIFETIME,
    maxLifetime: BULLET_LIFETIME,
    fades: false,
  };
}
