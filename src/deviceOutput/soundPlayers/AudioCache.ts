import machineGunFireUrl from "@/assets/sounds/machine_gun_fire.wav";
import bulletImpactUrl from "@/assets/sounds/bullet_impact.wav";
import missileLaunchUrl from "@/assets/sounds/missile_launch.wav";
import explosionUrl from "@/assets/sounds/explosion.wav";
import laserBeamFireUrl from "@/assets/sounds/laser_beam_fire.wav";
import sonicBoomUrl from "@/assets/sounds/sonic_boom.wav";
import dropMineUrl from "@/assets/sounds/drop_mine.wav";
import collisionUrl from "@/assets/sounds/collision.flac";
import mountUrl from "@/assets/sounds/mount.wav";
import playerJoinedUrl from "@/assets/sounds/playerJoined.mp3";
import playerReadyUrl from "@/assets/sounds/playerReady.mp3";

export class AudioCache {
  private cache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    this.preloadSound('machine_gun_fire', machineGunFireUrl);
    this.preloadSound('bullet_impact', bulletImpactUrl);
    this.preloadSound('missile_launch', missileLaunchUrl);
    this.preloadSound('explosion', explosionUrl);
    this.preloadSound('laser_beam_fire', laserBeamFireUrl);
    this.preloadSound('sonic_boom', sonicBoomUrl);
    this.preloadSound('drop_mine', dropMineUrl);
    this.preloadSound('collision', collisionUrl);
    this.preloadSound('mount', mountUrl);
    this.preloadSound('player_joined', playerJoinedUrl);
    this.preloadSound('player_ready', playerReadyUrl);
  }

  private preloadSound(key: string, url: string): void {
    const audio = new Audio(url);
    audio.preload = 'auto';
    this.cache.set(key, audio);
  }

  get(key: string): HTMLAudioElement {
    const audio = this.cache.get(key);
    if (!audio) throw new Error(`Audio not found: ${key}`);
    return audio;
  }
}
