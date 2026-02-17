import { ISoundPlayer } from "./ISoundPlayer";
import { GameEvent } from "@/game/events/eventTypes/GameEvent";
import { AudioCache } from "./AudioCache";

export class CarSoundPlayer implements ISoundPlayer {
  constructor(private audioCache: AudioCache) {}

  play(events: GameEvent[]): void {
    for (const ev of events) {
      if (ev.type === 'EngineRevved') {
        this.playEngineRev();
      }
    }
  }

  private playEngineRev(): void {
    const audio = this.audioCache.get('engine_2');
    try {
      audio.currentTime = 0;
      audio.volume = 0.7;
      void audio.play();
    } catch { /* autoplay blocked */ }
  }
}
