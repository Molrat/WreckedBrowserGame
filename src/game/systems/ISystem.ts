import { EventBus } from "../events/EventBus";
import { GameState } from "../state/GameState";

export interface ISystem {
    update :(state: GameState, eventBus: EventBus, dt: number)=> void;
}