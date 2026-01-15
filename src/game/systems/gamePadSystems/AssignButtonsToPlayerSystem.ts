import { EventBus } from "../../events/EventBus";
import { isControllable } from "../../queries/Controllable/isControllable";
import { GameState } from "../../state/GameState";
import { ISystem } from "./../ISystem";

export class AssignButtonsToPlayerSystem implements ISystem {
    update(state: GameState, eventBus: EventBus, dt: number): void {
        // Implementation would go here
        state.entities
            .filter(isControllable)
            .forEach(player => {
                const controller = state.input.gamePads
                    .find(c => c.id === player.controllerId);
                const previousController = state.input.previousGamepads
                    .find(c => c.id === player.controllerId);
                if (controller) {
                    player.currentGamepad = { ...controller };
                }
                if (previousController)
                {
                    player.previousGamepad =  { ...previousController };
                }
            });
        }
    }