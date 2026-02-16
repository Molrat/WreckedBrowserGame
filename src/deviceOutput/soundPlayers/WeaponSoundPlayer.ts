import { ISoundPlayer } from "./ISoundPlayer";
import { GameEvent } from "@/game/events/eventTypes/GameEvent";
import { ProjectileType } from "@/game/state/components/ProjectileType";
import { AudioCache } from "./AudioCache";

const weaponSoundKeys: Record<ProjectileType, { fire: string; impact: string }> = {
  machineGunBullet: { fire: 'machine_gun_fire', impact: 'bullet_impact' },
  missile:          { fire: 'missile_launch', impact: 'explosion' },
  laserBeam:        { fire: 'laser_beam_fire', impact: 'sonic_boom' },
  mine:             { fire: 'drop_mine', impact: 'explosion' },
};

export class WeaponSoundPlayer implements ISoundPlayer {
  constructor(private audioCache: AudioCache) {}

  play(events: GameEvent[]): void {
    for (const ev of events) {
      if (ev.type === 'ProjectileFired') {
        this.playSound(weaponSoundKeys[ev.projectileType].fire);
      } else if (ev.type === 'HitByProjectile') {
        this.playSound(weaponSoundKeys[ev.projectileType].impact);
      }
    }
  }

  private playSound(key: string): void {
    const audio = this.audioCache.get(key);
    try {
      audio.currentTime = 0;
      audio.volume = 0.5;
      void audio.play();
    } catch { /* autoplay blocked */ }
  }
}
