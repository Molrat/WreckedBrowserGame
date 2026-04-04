import { EventBus } from "../../events/EventBus";
import { GameState } from "../../state/GameState";
import { PlayerFactory } from "../../state/entities/Factories/PlayerFactory";
import { ISystem } from "../ISystem";

const TOGGLE_COUNT = 1;

export class SettingsMenuSystem implements ISystem {
    private wasActive = false;

    update(state: GameState, _eventBus: EventBus, _dt: number): void {
        if (state.ui.openMenu !== 'settingsMenu') {
            this.wasActive = false;
            return;
        }
        if (!this.wasActive) {
            this.wasActive = true;
            return;
        }
        if (state.input.gamePads.length !== state.input.previousGamepads.length) return;

        const menu = state.ui.settingsMenu;

        state.input.gamePads.forEach((controller, index) => {
            const prev = state.input.previousGamepads[index];
            if (!prev) return;

            this.handleNavigation(menu, controller.dpadUp, prev.dpadUp, -1);
            this.handleNavigation(menu, controller.dpadDown, prev.dpadDown, 1);
            this.handleToggle(state, menu, controller.cross, prev.cross);
            this.handleStart(state, controller.triangle, prev.triangle);
        });
    }

    private handleNavigation(menu: { selectedIndex: number }, current: boolean, previous: boolean, dir: number): void {
        if (current && !previous) {
            menu.selectedIndex = (menu.selectedIndex + dir + TOGGLE_COUNT) % TOGGLE_COUNT;
        }
    }

    private handleToggle(state: GameState, menu: { selectedIndex: number }, current: boolean, previous: boolean): void {
        if (!current || previous) return;
        if (menu.selectedIndex === 0) {
            state.ui.settings.carouselEnabled = !state.ui.settings.carouselEnabled;
        }
    }

    private handleStart(state: GameState, current: boolean, previous: boolean): void {
        if (!current || previous) return;
        const connections = state.ui.startMenu.playerConnections;
        connections.forEach(pc => {
            if (pc.status === 'ready' && pc.controllerId) {
                state.entities.push(...PlayerFactory.createWithWheels(pc.controllerId));
            }
        });
        state.ui.openMenu = null;
    }
}
