import { GameState } from "./GameState";
import { StartMenuState } from './ui/StartMenuState';

export class StateInitializer {
  static createInitialGameState(): GameState {
    return {
      entities: [],
      ui: {
        openMenu: 'start',
        previousMenuBeforeDisconnect: null,
        startMenu:{
          playerConnections: Array.from({ length: 8 }, () => ({ status: 'notJoined', controllerId: null }))
        },
      },
      time: { total: 0 },
      input: {
        previousGamepads: [],
        gamePads: []
      },
    };
  }
}