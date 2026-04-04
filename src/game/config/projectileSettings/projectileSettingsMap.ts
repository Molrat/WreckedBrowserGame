import { ProjectileType } from "@/game/state/components/ProjectileType";
import { ProjectileSettings } from "./ProjectileSettings";
import { laserBeamSettings } from "./laserBeamSettings";
import { machineGunBulletSettings } from "./machineGunBulletSettings";
import { mineSettings } from "./mineSettings";
import { missileSettings } from "./missileSettings";
import { cannonballSettings } from "./cannonballSettings";
import { boosterFlameSettings } from "./boosterFlameSettings";

const projectileSettingsMap: Record<ProjectileType, ProjectileSettings> = {
  laserBeam: laserBeamSettings,
  machineGunBullet: machineGunBulletSettings,
  mine: mineSettings,
  missile: missileSettings,
  cannonball: cannonballSettings,
  boosterFlame: boosterFlameSettings,
};

export function getProjectileSettings(type: ProjectileType): ProjectileSettings {
  return projectileSettingsMap[type];
}
