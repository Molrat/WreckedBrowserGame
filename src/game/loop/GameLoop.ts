import { EventBus } from '@/game/events/EventBus';
import { IRenderer} from '@/deviceOutput/render/IRenderer';
import { IScreenRenderer } from '@/deviceOutput/render/IScreenRenderer';
import { IEffectRenderer } from '@/deviceOutput/render/effects/IEffectRenderer';
import { ISoundPlayer } from '@/deviceOutput/soundPlayers/ISoundPlayer';
import { ISystem } from '@/game/systems/ISystem';
import { IInputInjector } from '@/deviceInput/IInputInjector';
import { GameState } from '@/game/state/GameState';
import { ICameraRenderAPI } from '@/deviceOutput/render/common/ICameraRenderAPI';
import { IScreenRenderAPI } from '@/deviceOutput/render/common/IScreenRenderAPI';


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
    private soundPlayers: ISoundPlayer[]) {
  }

  start() {
    this.lastTime = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.033, (t - this.lastTime) / 1000);
      this.lastTime = t;
      this.updateGameStateWithInput();
      this.updateGameState(dt);
      this.renderGameState();
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
}
