import { GameState } from "../../game/state/GameState";
import { IScreenRenderAPI } from "./common/IScreenRenderAPI";

export interface IScreenRenderer {
    render(gameState: GameState, draw: IScreenRenderAPI): void;
}
