import { nextId } from "@/utils/id";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { Vector2 } from "@/math/Vector2";
import {
  MACHINE_GUN_SHAPE,
  MACHINE_GUN_MOUNT_OFFSET,
  MACHINE_GUN_FILL,
  MACHINE_GUN_BORDER,
  MACHINE_GUN_DEPTH,
  MACHINE_GUN_AMMO,
  MACHINE_GUN_FIRE_RATE,
} from "@/game/config/weaponConstants";

export function createMachineGun(
  position: Vector2,
  spawnPlatformIndex: number
): WeaponWithAmmo {
  return {
    id: nextId(),
    position: { x: position.x, y: position.y },
    orientation: 0,
    shape: MACHINE_GUN_SHAPE.map(v => ({ ...v })),
    fillColor: MACHINE_GUN_FILL,
    borderColor: MACHINE_GUN_BORDER,
    borderWidth: 2,
    depth: MACHINE_GUN_DEPTH,
    mountedOnPlayerId: null,
    relativePosition: { ...MACHINE_GUN_MOUNT_OFFSET },
    relativeOrientation: Math.PI, // Pointing upwards by default
    currentAmmo: MACHINE_GUN_AMMO,
    maxAmmo: MACHINE_GUN_AMMO,
    fireRate: MACHINE_GUN_FIRE_RATE,
    fireCooldown: 0,
    projectileType: 'machineGunBullet',
    spawnPlatformIndex,
    velocity: { x: 0, y: 0 },
    angularVelocity: 1,
    mass: 15,
    momentOfInertia: 12,
    forces: [],
    impulses: [],
  };
}
