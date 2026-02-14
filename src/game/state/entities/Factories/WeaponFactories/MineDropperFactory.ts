import { nextId } from "@/utils/id";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { Vector2 } from "@/math/Vector2";
import {
  MINE_DROPPER_SHAPE,
  MINE_DROPPER_MOUNT_OFFSET,
  MINE_DROPPER_FILL,
  MINE_DROPPER_BORDER,
  MINE_DROPPER_DEPTH,
  MINE_DROPPER_AMMO,
} from "@/game/config/weaponConstants";

export function createMineDropper(
  position: Vector2,
  spawnPlatformIndex: number
): WeaponWithAmmo {
  return {
    id: nextId(),
    position: { x: position.x, y: position.y },
    orientation: 0,
    shape: MINE_DROPPER_SHAPE.map(v => ({ ...v })),
    fillColor: MINE_DROPPER_FILL,
    borderColor: MINE_DROPPER_BORDER,
    borderWidth: 2,
    depth: MINE_DROPPER_DEPTH,
    mountedOnPlayerId: null,
    relativePosition: { ...MINE_DROPPER_MOUNT_OFFSET },
    relativeOrientation: 0,
    currentAmmo: MINE_DROPPER_AMMO,
    maxAmmo: MINE_DROPPER_AMMO,
    fireRate: null,
    fireCooldown: 0,
    projectileType: 'mine',
    spawnPlatformIndex,
    velocity: { x: 0, y: 0 },
    angularVelocity: 1,
    mass: 20,
    momentOfInertia: 15,
    forces: [],
    impulses: [],
  };
}
