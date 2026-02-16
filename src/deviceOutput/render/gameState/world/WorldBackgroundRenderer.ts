import { IRenderer } from "../../IRenderer";
import { LightningStormManager } from "../../common/lightning/LightningStormManager";
import { lightningBoltStrokes } from "@/deviceOutput/render/common/lightning/lightningBoltStrokes";
import type { GameState } from "../../../../game/state/GameState";
import type { ICameraRenderAPI } from "../../common/ICameraRenderAPI";

export class WorldBackgroundRenderer implements IRenderer {
  private storm = new LightningStormManager();

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (! (state.ui.openMenu == null)) return;
    draw.clear();
    draw.fillBackground('#0b0b0f');
    draw.drawGrid(10, 'rgba(255,255,255,0.06)', 1);
    
  }

  addLightningStorm(state: GameState, draw: ICameraRenderAPI){
    const bolts = this.storm.update(state.time.total, draw.getWidth(), draw.getHeight());
    for (const bolt of bolts) {
      for (const seg of bolt.segments) {
        for (const stroke of lightningBoltStrokes(seg.width, bolt.alpha)) {
          draw.drawLineSequence(seg.points, stroke.color, stroke.width, true);
        }
      }
    }
  }
}
