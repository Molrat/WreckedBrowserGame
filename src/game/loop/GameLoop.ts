import { EventBus } from '@/game/events/EventBus';
import { IRenderer} from '@/deviceoutput/graphics/IRenderer';
import { IScreenRenderer } from '@/deviceoutput/graphics/IScreenRenderer';
import { IEffectRenderer } from '@/deviceoutput/graphics/effects/IEffectRenderer';
import { ISoundPlayer } from '@/deviceOutput/audio/eventBasedSounds/ISoundPlayer';
import { ISystem } from '@/game/systems/ISystem';
import { IInputInjector } from '@/deviceInput/IInputInjector';
import { GameState } from '@/game/state/GameState';
import { ICameraRenderAPI } from '@/deviceoutput/graphics/common/ICameraRenderAPI';
import { IScreenRenderAPI } from '@/deviceoutput/graphics/common/IScreenRenderAPI';
import { IContinuousSoundPlayer } from '@/deviceOutput/audio/continuousSounds/IContinuousSoundPlayer';


export class GameLoop {
  private lastTime = 0;

  constructor(
    private cameraDraw: ICameraRenderAPI,
    private screenDraw: IScreenRenderAPI,
    private gameState: GameState,
    private eventBus: EventBus,
    private inputInjectors: IInputInjector[],
    private systems: ISystem[], 
    private renderers: IRenderer[],
    private screenRenderers: IScreenRenderer[], 
    private effectRenderers: IEffectRenderer[], 
    private soundPlayers: ISoundPlayer[],
    private stateSoundPlayers: IContinuousSoundPlayer[],
  ) {
  }

  start() {
    this.lastTime = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.033, (t - this.lastTime) / 1000);
      this.lastTime = t;
      this.updateGameStateWithInput();
      this.updateGameState(dt);
      this.renderGameState();
      this.manageContinuousSounds();
      this.eventHandling(); // visual effects and sounds
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  stop() {
  }

  private updateGameStateWithInput() {
    for (const injector of this.inputInjectors) {
      injector.injectInputIntoState(this.gameState);
    }
  }

  private updateGameState(dt: number) {
    this.gameState.time.total += dt;
    for (const system of this.systems) {
      system.update(this.gameState, this.eventBus, dt);
    }
  }

  private renderGameState() {
    this.cameraDraw.beginFrame(this.gameState.camera);
    for (const renderer of this.renderers) {
      renderer.render(this.gameState, this.cameraDraw);
    }
    for (const renderer of this.screenRenderers) {
      renderer.render(this.gameState, this.screenDraw);
    }
  }

  private eventHandling(){
    const events = this.eventBus.drain();
    for (const sp of this.soundPlayers) {
      sp.play(events);
    }
    for (const effect of this.effectRenderers) {
      effect.render(events);
    }
  }

    private manageContinuousSounds() {
    for (const sp of this.stateSoundPlayers) {
      sp.play(this.gameState);
    }
  }
}
