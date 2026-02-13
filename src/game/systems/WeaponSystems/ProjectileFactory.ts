import { IProjectileFactory } from "./IProjectileFactory";
import { Projectile } from "@/game/state/entities/Projectile";
import { ProjectileType } from "@/game/state/components/ProjectileType";
import { Vector2 } from "@/math/Vector2";
import { createLaserBeam } from "@/game/state/entities/Factories/LaserBeamFactory";

export class ProjectileFactory implements IProjectileFactory {
  create(
    type: ProjectileType,
    position: Vector2,
    orientation: number,
    ownerPlayerId: string,
    playerVelocity: Vector2
  ): Projectile {
    switch (type) {
      case 'laserBeam':
        return createLaserBeam(position, orientation, ownerPlayerId, playerVelocity);
    }
  }
}
