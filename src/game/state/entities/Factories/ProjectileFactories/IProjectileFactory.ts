import { ProjectileType } from "@/game/state/components/ProjectileType";
import { Vector2 } from "@/math/Vector2";
import { FireResult } from "./FireResult";

export interface IProjectileFactory {
  create(
    type: ProjectileType,
    position: Vector2,
    orientation: number,
    ownerPlayerId: string,
    playerVelocity: Vector2,
    gameTime: number
  ): FireResult;
}
