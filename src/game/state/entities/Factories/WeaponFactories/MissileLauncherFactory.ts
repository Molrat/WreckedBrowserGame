import { nextId } from "@/utils/id";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { Vector2 } from "@/math/Vector2";
import {
  MISSILE_LAUNCHER_SHAPE,
  MISSILE_LAUNCHER_MOUNT_OFFSET,
  MISSILE_LAUNCHER_FILL,
  MISSILE_LAUNCHER_BORDER,
  MISSILE_LAUNCHER_DEPTH,
  MISSILE_LAUNCHER_AMMO,
} from "@/game/config/weaponConstants";

export function createMissileLauncher(
  position: Vector2,
  spawnPlatformIndex: number
): WeaponWithAmmo {
  return {
    id: nextId(),
    position: { x: position.x, y: position.y },
    orientation: 0,
    shape: MISSILE_LAUNCHER_SHAPE.map(v => ({ ...v })),
    fillColor: MISSILE_LAUNCHER_FILL,
    borderColor: MISSILE_LAUNCHER_BORDER,
    borderWidth: 2,
    depth: MISSILE_LAUNCHER_DEPTH,
    mountedOnPlayerId: null,
    relativePosition: { ...MISSILE_LAUNCHER_MOUNT_OFFSET },
    relativeOrientation: 0,
    currentAmmo: MISSILE_LAUNCHER_AMMO,
    maxAmmo: MISSILE_LAUNCHER_AMMO,
    fireRate: null,
    fireCooldown: 0,
    projectileType: 'missile',
    spawnPlatformIndex,
    velocity: { x: 0, y: 0 },
    angularVelocity: 1,
    mass: 10,
    momentOfInertia: 10,
    forces: [],
    impulses: [],
  };
}
