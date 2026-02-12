import { ProjectileType } from "./ProjectileType";

export type WithAmmo = {
  currentAmmo: number;
  maxAmmo: number;
  projectileType: ProjectileType;
};
