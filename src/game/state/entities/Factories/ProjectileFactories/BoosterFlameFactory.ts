import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { Vector2, angleToUnitVector, scale, add } from "@/math/Vector2";
import {
  BOOSTER_FLAME_LENGTH, BOOSTER_FLAME_WIDTH, BOOSTER_FLAME_SPEED,
  BOOSTER_FLAME_LIFETIME, BOOSTER_FLAME_DAMAGE, BOOSTER_FLAME_IMPULSE,
  BOOSTER_FLAME_FILL, BOOSTER_FLAME_BORDER, BOOSTER_FLAME_DEPTH,
  BOOSTER_FLAME_RECOIL,
} from "@/game/config/weaponConstants";
import { FireResult } from "./FireResult";

export function createBoosterFlame(
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2
): FireResult {
  const halfW = BOOSTER_FLAME_WIDTH / 2;
  const vel = add(playerVelocity, scale(angleToUnitVector(orientation), BOOSTER_FLAME_SPEED));
  const spawnPos = add(position, scale(angleToUnitVector(orientation), BOOSTER_FLAME_LENGTH / 2));
  const projectile: Projectile = {
    id: nextId(),
    health: 1, maxHealth: 1,
    position: { x: spawnPos.x, y: spawnPos.y },
    orientation,
    velocity: vel, angularVelocity: 0,
    mass: 0.01, momentOfInertia: 0.001,
    forces: [], impulses: [],
    shape: [
      { x: 0, y: -halfW },
      { x: BOOSTER_FLAME_LENGTH, y: 0 },
      { x: 0, y: halfW },
    ],
    fillColor: BOOSTER_FLAME_FILL,
    borderColor: BOOSTER_FLAME_BORDER,
    borderWidth: 1,
    depth: BOOSTER_FLAME_DEPTH,
    damage: BOOSTER_FLAME_DAMAGE,
    ownerPlayerId,
    impulseMagnitude: BOOSTER_FLAME_IMPULSE,
    destroyOnHit: true,
    projectileType: 'boosterFlame',
    lifetime: BOOSTER_FLAME_LIFETIME,
    maxLifetime: BOOSTER_FLAME_LIFETIME,
    fades: true,
  };
  return { projectile, recoil: BOOSTER_FLAME_RECOIL };
}
