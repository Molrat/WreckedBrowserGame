import { Projectile } from "@/game/state/entities/Projectile";
import { ProjectileType } from "@/game/state/components/ProjectileType";
import { Vector2 } from "@/math/Vector2";

export interface IProjectileFactory {
  create(
    type: ProjectileType,
    position: Vector2,
    orientation: number,
    ownerPlayerId: string,
    playerVelocity: Vector2,
    gameTime: number
  ): Projectile;
}
