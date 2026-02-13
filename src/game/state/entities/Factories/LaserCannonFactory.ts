import { nextId } from "@/utils/id";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { Vector2 } from "@/math/Vector2";
import {
  LASER_CANNON_SHAPE,
  LASER_CANNON_MOUNT_OFFSET,
  LASER_CANNON_FILL,
  LASER_CANNON_BORDER,
  LASER_CANNON_DEPTH,
} from "@/game/config/weaponConstants";

export function createLaserCannon(
  position: Vector2,
  spawnPlatformIndex: number
): WeaponWithAmmo {
  return {
    id: nextId(),
    position: { x: position.x, y: position.y },
    orientation: 0,
    shape: LASER_CANNON_SHAPE.map(v => ({ ...v })),
    fillColor: LASER_CANNON_FILL,
    borderColor: LASER_CANNON_BORDER,
    borderWidth: 2,
    depth: LASER_CANNON_DEPTH,
    mountedOnPlayerId: null,
    relativePosition: { ...LASER_CANNON_MOUNT_OFFSET },
    relativeOrientation: 0,
    currentAmmo: 1,
    maxAmmo: 1,
    projectileType: 'laserBeam',
    spawnPlatformIndex,
    velocity: { x: 0, y: 0 },
    angularVelocity: 1,
    mass: 10,
    momentOfInertia: 10,
    forces: [],
    impulses: [],
  };
}
