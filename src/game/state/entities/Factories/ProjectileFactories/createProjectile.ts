import { nextId } from "@/utils/id";
import { Projectile } from "@/game/state/entities/Projectile";
import { add, angleToUnitVector, scale, Vector2 } from "@/math/Vector2";
import { ProjectileSettings } from "@/game/config/projectileSettings/ProjectileSettings";
import { randomSign } from "@/utils/randomSign";
import { FireResult } from "./FireResult";

export function createProjectile(
  settings: ProjectileSettings,
  position: Vector2,
  orientation: number,
  ownerPlayerId: string,
  playerVelocity: Vector2,
  gameTime: number
): FireResult {
  const dir = angleToUnitVector(orientation);
  const spawnPos = settings.spawnOffset > 0
    ? add(position, scale(dir, settings.spawnOffset))
    : { x: position.x, y: position.y };

  const baseVelocity = settings.speed > 0 ? scale(dir, settings.speed) : { x: 0, y: 0 };
  const velocity = settings.speedRelativeToPlayer
    ? add(playerVelocity, baseVelocity)
    : baseVelocity;

  const angularVelocity = settings.angularSpeed > 0 && settings.randomizeAngularDirection
    ? settings.angularSpeed * randomSign()
    : settings.angularSpeed;

  const impulses = settings.launchImpulse > 0
    ? [{ impulse: scale(dir, settings.launchImpulse), localContactPoint: { x: 0, y: 0 } }]
    : [];

  const projectile: Projectile = {
    id: nextId(),
    health: settings.health,
    maxHealth: settings.health,
    position: spawnPos,
    orientation,
    velocity,
    angularVelocity,
    mass: settings.mass,
    momentOfInertia: settings.momentOfInertia,
    forces: [],
    impulses,
    shape: settings.shape.map(v => ({ ...v })),
    fillColor: settings.fillColor,
    borderColor: settings.borderColor,
    borderWidth: settings.borderWidth,
    depth: settings.depth,
    damage: settings.damage,
    ownerPlayerId,
    impulseMagnitude: settings.impulseMagnitude,
    destroyOnHit: settings.destroyOnHit,
    projectileType: settings.projectileType,
    lifetime: settings.lifetime,
    maxLifetime: settings.lifetime,
    fades: settings.fades,
    isHeatSeeking: settings.isHeatSeeking,
    spawnTime: gameTime,
  };
  return { projectile, recoil: settings.recoil };
}
