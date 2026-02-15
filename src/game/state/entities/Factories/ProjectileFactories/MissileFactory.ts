import { nextId } from "@/utils/id";
import { HeatSeaking, Projectile } from "@/game/state/entities/Projectile";
import { add, angleToUnitVector, scale, Vector2 } from "@/math/Vector2";
import {
  MISSILE_LENGTH,
  MISSILE_WIDTH,
  MISSILE_SPEED,
  MISSILE_LIFETIME,
  MISSILE_DAMAGE,
  MISSILE_IMPULSE,
  MISSILE_FILL,
  MISSILE_BORDER,
  MISSILE_DEPTH,
} from "@/game/config/weaponConstants";

export function createMissile(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2
): Projectile & HeatSeaking {
  const halfL = MISSILE_LENGTH / 2;
  const halfW = MISSILE_WIDTH / 2;
  const velocity = add(playerVelocity, scale(angleToUnitVector(orientation), MISSILE_SPEED));

  return {
    isHeatSeeking: true,
    id: nextId(),
    health: 1,
    maxHealth: 1,
    position: { x: position.x, y: position.y },
    orientation,
    velocity,
    angularVelocity: 0,
    mass: 5,
    momentOfInertia: 2,
    forces: [],
    impulses: [],
    shape: [
      { x: -halfL, y: -halfW },
      { x: halfL * 0.5, y: -halfW },
      { x: halfL, y: 0 },
      { x: halfL * 0.5, y: halfW },
      { x: -halfL, y: halfW },
    ],
    fillColor: MISSILE_FILL,
    borderColor: MISSILE_BORDER,
    borderWidth: 1,
    depth: MISSILE_DEPTH,
    damage: MISSILE_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: MISSILE_IMPULSE,
    destroyOnHit: true,
    lifetime: MISSILE_LIFETIME,
    maxLifetime: MISSILE_LIFETIME,
    fades: false,
  };
}
