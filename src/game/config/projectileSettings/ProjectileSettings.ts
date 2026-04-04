import { ProjectileType } from "@/game/state/components/ProjectileType";
import { Vector2 } from "@/math/Vector2";

export type ProjectileSettings = {
  projectileType: ProjectileType;
  shape: Vector2[];
  spawnOffset: number;
  speed: number;
  speedRelativeToPlayer: boolean;
  health: number;
  mass: number;
  momentOfInertia: number;
  borderWidth: number;
  fillColor: string;
  borderColor: string;
  depth: number;
  damage: number;
  impulseMagnitude: number;
  lifetime: number;
  recoil: number;
  destroyOnHit: boolean;
  fades: boolean;
  angularSpeed: number;
  randomizeAngularDirection: boolean;
  isHeatSeeking: boolean;
  launchImpulse: number;
};
