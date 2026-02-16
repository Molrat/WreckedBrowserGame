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
        this.playOneShot(0.5);
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

  private playOneShot(volume: number): void {
    const audio = this.audioCache.get('mount');
    if (!audio.paused) return;
    audio.volume = volume;
    audio.currentTime = 0;
    try { void audio.play(); } catch { /* autoplay blocked */ }
  }
}
