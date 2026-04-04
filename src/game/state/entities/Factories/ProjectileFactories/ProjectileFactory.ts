import { IProjectileFactory } from "./IProjectileFactory";
import { ProjectileType } from "@/game/state/components/ProjectileType";
import { Vector2 } from "@/math/Vector2";
import { FireResult } from "./FireResult";
import { createProjectile } from "./createProjectile";
import { getProjectileSettings } from "@/game/config/projectileSettings/projectileSettingsMap";

export class ProjectileFactory implements IProjectileFactory {
  create(
    type: ProjectileType,
    position: Vector2,
    orientation: number,
    ownerPlayerId: string,
    playerVelocity: Vector2,
    gameTime: number
  ): FireResult {
    const settings = getProjectileSettings(type);
    return createProjectile(settings, position, orientation, ownerPlayerId, playerVelocity, gameTime);
  }
}
