import { ISoundPlayer } from "./ISoundPlayer";
import { GameEvent } from "../../game/events/eventTypes/GameEvent";
import joinUrl from "../../assets/sounds/playerJoined.mp3";
import readyUrl from "../../assets/sounds/playerReady.mp3";

export class StartMenuSoundPlayer implements ISoundPlayer {
  private joinAudio: HTMLAudioElement;
  private readyAudio: HTMLAudioElement;

  constructor() {
    this.joinAudio = new Audio(joinUrl);
    this.readyAudio = new Audio(readyUrl);
    this.joinAudio.preload = 'auto';
    this.readyAudio.preload = 'auto';
    this.joinAudio.volume = 0.8;
    this.readyAudio.volume = 0.8;
  }

  play(events: GameEvent[]): void {
    for (const ev of events) {
      if (ev.type === 'StartMenuPlayerJoined') {
        this.tryPlay(this.joinAudio);
      } else if (ev.type === 'StartMenuPlayerReady') {
        this.tryPlay(this.readyAudio);
      }
    }
  }

  private tryPlay(audio: HTMLAudioElement) {
    try {
      audio.currentTime = 0;
      void audio.play();
    } catch {
      // Ignore autoplay errors; user interaction will allow subsequent plays
    }
  }
}
