import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { Vector2 } from "@/math/Vector2";
import {
  MINE_SHAPE,
  MINE_LIFETIME,
  MINE_DAMAGE,
  MINE_IMPULSE,
  MINE_FILL,
  MINE_BORDER,
  MINE_DEPTH,
} from "@/game/config/weaponConstants";

export function createMine(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string
): Projectile {
  return {
    id: nextId(),
    health: 1,
    maxHealth: 1,
    position: { x: position.x, y: position.y },
    orientation,
    velocity: { x: 0, y: 0 },
    angularVelocity: 0,
    mass: 50,
    momentOfInertia: 10,
    forces: [],
    impulses: [],
    shape: MINE_SHAPE.map(v => ({ ...v })),
    fillColor: MINE_FILL,
    borderColor: MINE_BORDER,
    borderWidth: 2,
    depth: MINE_DEPTH,
    damage: MINE_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: MINE_IMPULSE,
    destroyOnHit: true,
    projectileType: 'mine',
    lifetime: MINE_LIFETIME,
    maxLifetime: MINE_LIFETIME,
    fades: false,
  };
}
