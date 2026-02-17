import { ISoundPlayer } from "./ISoundPlayer";
import { GameEvent } from "../../../game/events/eventTypes/GameEvent";
import { AudioCache } from "./AudioCache";

export class StartMenuSoundPlayer implements ISoundPlayer {
  constructor(private audioCache: AudioCache) {}

  play(events: GameEvent[]): void {
    for (const ev of events) {
      if (ev.type === 'StartMenuPlayerJoined') {
        this.tryPlay('player_joined', 0.8);
      } else if (ev.type === 'StartMenuPlayerReady') {
        this.tryPlay('player_ready', 0.8);
      }
    }
  }

  private tryPlay(key: string, volume: number): void {
    const audio = this.audioCache.get(key);
    try {
      audio.currentTime = 0;
      audio.volume = volume;
      void audio.play();
    } catch {
      // Ignore autoplay errors; user interaction will allow subsequent plays
    }
  }
}
