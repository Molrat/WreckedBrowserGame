import { GameEvent } from "../../../game/events/eventTypes/GameEvent";
import { IScreenRenderAPI } from "../common/IScreenRenderAPI";

export interface IEffectRenderer {
  render(events: GameEvent[], draw: IScreenRenderAPI): void;
}
