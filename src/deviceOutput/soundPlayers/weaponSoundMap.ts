import { ProjectileType } from "@/game/state/components/ProjectileType";

import machineGunFireUrl from "@/assets/sounds/machine_gun_fire.wav";
import bulletImpactUrl from "@/assets/sounds/bullet_impact.wav";
import missileLaunchUrl from "@/assets/sounds/missile_launch.wav";
import explosionUrl from "@/assets/sounds/explosion.wav";
import laserBeamFireUrl from "@/assets/sounds/laser_beam_fire.wav";
import sonicBoomUrl from "@/assets/sounds/sonic_boom.wav";
import dropMineUrl from "@/assets/sounds/drop_mine.wav";

type SoundPair = { fire: string; impact: string };

export const weaponSoundMap: Record<ProjectileType, SoundPair> = {
  machineGunBullet: { fire: machineGunFireUrl, impact: bulletImpactUrl },
  missile:          { fire: missileLaunchUrl,   impact: explosionUrl },
  laserBeam:        { fire: laserBeamFireUrl,   impact: sonicBoomUrl },
  mine:             { fire: dropMineUrl,        impact: explosionUrl },
};
