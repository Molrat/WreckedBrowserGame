import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { add, angleToUnitVector, scale, Vector2 } from "@/math/Vector2";
import {
  CANNONBALL_RADIUS,
  CANNONBALL_SEGMENTS,
  CANNONBALL_SPEED,
  CANNONBALL_LIFETIME,
  CANNONBALL_DAMAGE,
  CANNONBALL_IMPULSE,
  CANNONBALL_FILL,
  CANNONBALL_BORDER,
  CANNONBALL_DEPTH,
} from "@/game/config/weaponConstants";

function buildCircleShape(radius: number, segments: number): Vector2[] {
  const points: Vector2[] = [];
  for (let i = 0; i < segments; i++) {
    const angle = (2 * Math.PI * i) / segments;
    points.push({ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
  }
  return points;
}

export function createCannonball(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2
): Projectile {
  const velocity = add(
    playerVelocity,
    scale(angleToUnitVector(orientation), CANNONBALL_SPEED)
  );

  return {
    id: nextId(),
    health: 1,
    maxHealth: 1,
    position: { x: position.x, y: position.y },
    orientation,
    velocity,
    angularVelocity: 0,
    mass: 20,
    momentOfInertia: 5,
    forces: [],
    impulses: [],
    shape: buildCircleShape(CANNONBALL_RADIUS, CANNONBALL_SEGMENTS),
    fillColor: CANNONBALL_FILL,
    borderColor: CANNONBALL_BORDER,
    borderWidth: 2,
    depth: CANNONBALL_DEPTH,
    damage: CANNONBALL_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: CANNONBALL_IMPULSE,
    destroyOnHit: true,
    projectileType: 'cannonball',
    lifetime: CANNONBALL_LIFETIME,
    maxLifetime: CANNONBALL_LIFETIME,
    fades: false,
  };
}
