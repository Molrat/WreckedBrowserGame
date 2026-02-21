import { GameState } from "../../game/state/GameState";
import { ICameraRenderAPI } from "./common/ICameraRenderAPI";

export interface IRenderer{
    render(gameState: GameState, draw: ICameraRenderAPI): void;
}