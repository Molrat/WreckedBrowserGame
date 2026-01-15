import { GameState } from "../../game/state/GameState";

export interface IRenderer{
    render(gameState: GameState): void;
}