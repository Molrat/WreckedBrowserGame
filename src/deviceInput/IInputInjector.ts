import { GameState } from "../game/state/GameState";

export interface IInputInjector{
    injectInputIntoState(state: GameState): void;
}