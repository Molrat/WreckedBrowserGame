import { nextId } from "@/utils/id";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { Vector2 } from "@/math/Vector2";
import {
  BOOSTER_SHAPE, BOOSTER_MOUNT_OFFSET, BOOSTER_FILL,
  BOOSTER_BORDER, BOOSTER_DEPTH, BOOSTER_AMMO, BOOSTER_FIRE_RATE,
} from "@/game/config/weaponConstants";

export function createBooster(
  position: Vector2,
  spawnPlatformIndex: number
): WeaponWithAmmo {
  return {
    id: nextId(),
    position: { x: position.x, y: position.y },
    orientation: 0,
    shape: BOOSTER_SHAPE.map(v => ({ ...v })),
    fillColor: BOOSTER_FILL,
    borderColor: BOOSTER_BORDER,
    borderWidth: 2,
    depth: BOOSTER_DEPTH,
    mountedOnPlayerId: null,
    relativePosition: { ...BOOSTER_MOUNT_OFFSET },
    relativeOrientation: Math.PI,
    currentAmmo: BOOSTER_AMMO,
    maxAmmo: BOOSTER_AMMO,
    fireRate: BOOSTER_FIRE_RATE,
    fireCooldown: 0,
    projectileType: 'boosterFlame',
    spawnPlatformIndex,
    velocity: { x: 0, y: 0 },
    angularVelocity: 1,
    mass: 10,
    momentOfInertia: 8,
    forces: [],
    impulses: [],
  };
}
