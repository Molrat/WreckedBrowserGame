import { EventBus } from "../../events/EventBus";
import { GameState } from "../../state/GameState";
import { ISystem } from "../ISystem";

export class SetPreviousButtonsSystem implements ISystem {
    update(state: GameState, eventBus: EventBus, deltaTime: number): void {
        state.input.previousGamepads = state.input.gamePads.map(controller => ({ ...controller }) );
    }
}