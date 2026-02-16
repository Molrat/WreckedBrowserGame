import { ISoundPlayer } from "./ISoundPlayer";
import { GameEvent } from "@/game/events/eventTypes/GameEvent";
import { AudioCache } from "./AudioCache";

const MAX_COLLISION_IMPULSE = 15000;

export class GameplaySoundPlayer implements ISoundPlayer {
  constructor(private audioCache: AudioCache) {}

  play(events: GameEvent[]): void {
    for (const ev of events) {
      if (ev.type === 'CarCollision') {
        this.playCollision(ev.impulseMagnitude);
      } else if (ev.type === 'WeaponPickup') {
        this.playMount(0.5);
      } else if (ev.type === 'PlayerDied') {
        this.playExplosion(0.7);
      } else if (ev.type === 'CountdownTick') {
        this.playCountdown(ev.step);
      }
    }
  }

  private playCollision(impulse: number): void {
    const audio = this.audioCache.get('collision');
    if (!audio.paused) return;
    const volume = Math.min(1, impulse / MAX_COLLISION_IMPULSE);
    audio.volume = volume;
    audio.currentTime = 0;
    try { void audio.play(); } catch { /* autoplay blocked */ }
  }

  private playMount(volume: number): void {
    const audio = this.audioCache.get('mount');
    if (!audio.paused) return;
    audio.volume = volume;
    audio.currentTime = 0;
    try { void audio.play(); } catch { /* autoplay blocked */ }
  }

  private playExplosion(volume: number): void {
    const audio = this.audioCache.get('explosion');
    if (!audio.paused) return;
    audio.volume = volume;
    audio.currentTime = 0;
    try { void audio.play(); } catch { /* autoplay blocked */ }
  }

  private playCountdown(step: number): void {
    const key = step > 0 ? 'count_down' : 'count_down_go';
    const audio = this.audioCache.get(key);
    audio.currentTime = 0;
    audio.volume = 0.3;
    try { void audio.play(); } catch { /* autoplay blocked */ }
  }
}
