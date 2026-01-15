import { GameEvent } from "../../game/events/eventTypes/GameEvent";

export interface ISoundPlayer {
  play(events: GameEvent[]): void;
}
