import { GameState } from "@/game/state/GameState";
import { IContinuousSoundPlayer } from "./IContinuousSoundPlayer";
import menuMusicUrl from "@/assets/music/menu/Brave Space Explorers.mp3";
import levelTrack1Url from "@/assets/music/level/Deus_Ex_Tempus.mp3";
import levelTrack2Url from "@/assets/music/level/Echoes of Eternity.mp3";
import levelTrack3Url from "@/assets/music/level/Viktor Kraus - Well oiled, shiny Oscillators.wav";

const MUSIC_VOLUME = 0.4;
const CROSSFADE_SPEED = 0.02;

export class MusicPlayer implements IContinuousSoundPlayer {
  private menuTrack: HTMLAudioElement;
  private levelTracks: HTMLAudioElement[];
  private currentLevelIndex = -1;
  private activeTrack: HTMLAudioElement | null = null;
  private targetTrack: HTMLAudioElement | null = null;
  private pendingPlay = false;

  constructor() {
    this.menuTrack = this.createAudio(menuMusicUrl);
    this.levelTracks = this.shuffled([levelTrack1Url, levelTrack2Url, levelTrack3Url].map(u => this.createAudio(u)));
    this.addGestureListeners();
  }

  play(state: GameState): void {
    const isMenu = state.ui.openMenu === 'intro' || state.ui.openMenu === 'start' || state.ui.openMenu === 'endOfGame';
    const desired = isMenu ? this.menuTrack : this.getNextLevelTrack();

    if (this.targetTrack !== desired) {
      this.targetTrack = desired;
    }

    this.crossfade();
  }

  private crossfade(): void {
    // Fade out active if it's not the target
    if (this.activeTrack && this.activeTrack !== this.targetTrack) {
      this.activeTrack.volume = Math.max(0, this.activeTrack.volume - CROSSFADE_SPEED);
      if (this.activeTrack.volume <= 0) {
        this.activeTrack.pause();
        this.activeTrack.currentTime = 0;
        this.activeTrack = null;
      }
    }

    // Fade in target
    if (this.targetTrack) {
      if (this.activeTrack !== this.targetTrack) {
        if (!this.activeTrack) {
          this.targetTrack.volume = 0;
          this.activeTrack = this.targetTrack;
          this.pendingPlay = true;
        }
      }

      // Keep retrying play until browser allows it
      if (this.pendingPlay && this.activeTrack) {
        this.activeTrack.play()
          .then(() => { this.pendingPlay = false; })
          .catch(() => { /* autoplay blocked, retry next frame */ });
      }

      if (this.activeTrack === this.targetTrack && !this.pendingPlay && this.activeTrack.volume < MUSIC_VOLUME) {
        this.activeTrack.volume = Math.min(MUSIC_VOLUME, this.activeTrack.volume + CROSSFADE_SPEED);
      }
    }
  }

  private getNextLevelTrack(): HTMLAudioElement {
    const current = this.levelTracks[this.currentLevelIndex];
    if (current && !current.ended) return current;
    this.currentLevelIndex = (this.currentLevelIndex + 1) % this.levelTracks.length;
    if (this.currentLevelIndex === 0) {
      this.levelTracks = this.shuffled(this.levelTracks);
    }
    return this.levelTracks[this.currentLevelIndex];
  }

  private addGestureListeners(): void {
    const tryPlay = () => {
      if (!this.pendingPlay || !this.activeTrack) return;
      this.activeTrack.play()
        .then(() => {
          this.pendingPlay = false;
          this.removeGestureListeners();
        })
        .catch(() => { /* still blocked */ });
    };
    this.gestureHandler = tryPlay;
    for (const evt of ['click', 'keydown', 'touchstart', 'pointerdown'] as const) {
      window.addEventListener(evt, tryPlay, { once: false });
    }
  }

  private gestureHandler: (() => void) | null = null;

  private removeGestureListeners(): void {
    if (!this.gestureHandler) return;
    for (const evt of ['click', 'keydown', 'touchstart', 'pointerdown'] as const) {
      window.removeEventListener(evt, this.gestureHandler);
    }
    this.gestureHandler = null;
  }

  private createAudio(url: string): HTMLAudioElement {
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.volume = 0;
    return audio;
  }

  private shuffled<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
