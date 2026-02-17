import { GameState } from "@/game/state/GameState";
import { IContinuousSoundPlayer } from "./IContinuousSoundPlayer";
import { AudioCache } from "../eventBasedSounds/AudioCache";
import { isPlayer } from "@/game/queries/Player/isPlayer";
import { ENGINE_SOUND_CONFIG } from "@/game/config/engineSoundConstants";

export class CarControlSoundPlayer implements IContinuousSoundPlayer {
  private engineSounds: Map<string, HTMLAudioElement> = new Map();

  constructor(private audioCache: AudioCache) {}

  play(state: GameState): void {
    const players = state.entities.filter(isPlayer);
    const currentPlayerIds = new Set(players.map(p => p.id));

    // Start/update engine sounds for active players
    for (const player of players) {
      let engineAudio = this.engineSounds.get(player.id);
      
      if (!engineAudio) {
        engineAudio = this.createEngineSound();
        this.engineSounds.set(player.id, engineAudio);
      }

      this.updateEngineSound(engineAudio, player.throttle);
    }

    // Stop and remove engine sounds for players no longer in entities
    for (const [playerId, engineAudio] of this.engineSounds) {
      if (!currentPlayerIds.has(playerId)) {
        this.stopEngineSound(engineAudio);
        this.engineSounds.delete(playerId);
      }
    }
  }

  private createEngineSound(): HTMLAudioElement {
    const engineTemplate = this.audioCache.get('engine');
    const audio = new Audio(engineTemplate.src);
    audio.loop = true;

    audio.volume = ENGINE_SOUND_CONFIG.MIN_VOLUME;
    audio.playbackRate = ENGINE_SOUND_CONFIG.MIN_PLAYBACK_RATE;

    try {
      void audio.play();
    } catch {
      // Autoplay blocked - will start on next user interaction
    }
    
    return audio;
  }

  private updateEngineSound(audio: HTMLAudioElement, throttle: number): void {
    const normalizedThrottle = Math.max(0, Math.min(1, throttle));
    
    audio.volume = ENGINE_SOUND_CONFIG.MIN_VOLUME + 
      normalizedThrottle * (ENGINE_SOUND_CONFIG.MAX_VOLUME - ENGINE_SOUND_CONFIG.MIN_VOLUME);
    
    audio.playbackRate = ENGINE_SOUND_CONFIG.MIN_PLAYBACK_RATE + 
      normalizedThrottle * (ENGINE_SOUND_CONFIG.MAX_PLAYBACK_RATE - ENGINE_SOUND_CONFIG.MIN_PLAYBACK_RATE);
  }

  private stopEngineSound(audio: HTMLAudioElement): void {
    audio.pause();
    audio.currentTime = 0;
  }
}