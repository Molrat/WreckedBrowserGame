import { GameEvent } from "../../../game/events/eventTypes/GameEvent";

export interface IEffectRenderer {
  render(events: GameEvent[]): void;
}
