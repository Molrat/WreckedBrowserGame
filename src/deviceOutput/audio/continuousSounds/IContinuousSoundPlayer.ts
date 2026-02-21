import { GameState } from "@/game/state/GameState";
import { GameEvent } from "../../../game/events/eventTypes/GameEvent";

export interface IContinuousSoundPlayer {
  play(state: GameState): void;
}
