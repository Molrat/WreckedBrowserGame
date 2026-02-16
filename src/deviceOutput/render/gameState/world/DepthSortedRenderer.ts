import { IRenderer } from "@/deviceOutput/render/IRenderer";
import type { GameState } from "@/game/state/GameState";
import type { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";
import { isRenderable } from "@/game/queries/Renderable/isRenderable";
import { isTextable } from "@/game/queries/Textable/isTextable";
import type { IRenderable } from "@/game/queries/Renderable/IRenderable";
import type { ITextable } from "@/game/queries/Textable/ITextable";

type RenderItem = 
  | { type: 'polygon'; depth: number; entity: IRenderable }
  | { type: 'text'; depth: number; entity: ITextable };

export class DepthSortedRenderer implements IRenderer {
  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === null)) return;

    const items: RenderItem[] = [];

    for (const e of state.entities) {
      if (isRenderable(e)) {
        items.push({ type: 'polygon', depth: e.depth, entity: e });
      }
      if (isTextable(e)) {
        items.push({ type: 'text', depth: e.textDepth, entity: e });
      }
    }

    items.sort((a, b) => a.depth - b.depth);

    for (const item of items) {
      if (item.type === 'polygon') {
        draw.drawPolygon(item.entity);
      } else {
        const pos = {
          x: item.entity.position.x + item.entity.textOffset.x,
          y: item.entity.position.y + item.entity.textOffset.y,
        };
        draw.drawWorldText(item.entity.text, pos, item.entity.textSize, item.entity.textColor);
      }
    }
  }
}
