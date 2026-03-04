import { nextId } from "@/utils/id";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { Vector2 } from "@/math/Vector2";
import {
  CANNON_SHAPE,
  CANNON_MOUNT_OFFSET,
  CANNON_FILL,
  CANNON_BORDER,
  CANNON_DEPTH,
  CANNON_AMMO,
} from "@/game/config/weaponConstants";

export function createCannon(
  position: Vector2,
  spawnPlatformIndex: number
): WeaponWithAmmo {
  const relativeOrientation = Math.random() < 0.5
    ? Math.PI / 2
    : (3 * Math.PI) / 2;

  return {
    id: nextId(),
    position: { x: position.x, y: position.y },
    orientation: 0,
    shape: CANNON_SHAPE.map(v => ({ ...v })),
    fillColor: CANNON_FILL,
    borderColor: CANNON_BORDER,
    borderWidth: 2,
    depth: CANNON_DEPTH,
    mountedOnPlayerId: null,
    relativePosition: { ...CANNON_MOUNT_OFFSET },
    relativeOrientation,
    currentAmmo: CANNON_AMMO,
    maxAmmo: CANNON_AMMO,
    fireRate: null,
    fireCooldown: 0,
    projectileType: 'cannonball',
    spawnPlatformIndex,
    velocity: { x: 0, y: 0 },
    angularVelocity: 0.5,
    mass: 30,
    momentOfInertia: 20,
    forces: [],
    impulses: [],
  };
}
