import { ProjectileType } from "./ProjectileType";

export type WithAmmo = {
  currentAmmo: number;
  maxAmmo: number;
  projectileType: ProjectileType;
  fireRate: number | null; // shots per second, null for single-shot weapons
  fireCooldown: number;    // seconds until next shot allowed
};
