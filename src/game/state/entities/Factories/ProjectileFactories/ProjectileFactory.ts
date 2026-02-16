import { IProjectileFactory } from "./IProjectileFactory";
import { Projectile } from "@/game/state/entities/Projectile";
import { ProjectileType } from "@/game/state/components/ProjectileType";
import { Vector2 } from "@/math/Vector2";
import { createLaserBeam } from "@/game/state/entities/Factories/ProjectileFactories/LaserBeamFactory";
import { createMachineGunBullet } from "@/game/state/entities/Factories/ProjectileFactories/MachineGunBulletFactory";
import { createMine } from "./MineFactory";
import { createMissile } from "./MissileFactory";

export class ProjectileFactory implements IProjectileFactory {
  create(
    type: ProjectileType,
    position: Vector2,
    orientation: number,
    ownerPlayerId: string,
    playerVelocity: Vector2,
    gameTime: number
  ): Projectile {
    switch (type) {
      case 'laserBeam':
        return createLaserBeam(position, orientation, ownerPlayerId, playerVelocity);
      case 'machineGunBullet':
        return createMachineGunBullet(position, orientation, ownerPlayerId, playerVelocity);
      case 'mine':
        return createMine(position, orientation, ownerPlayerId);
      case 'missile':
        return createMissile(position, orientation, ownerPlayerId, playerVelocity, gameTime);
    }
  }
}
