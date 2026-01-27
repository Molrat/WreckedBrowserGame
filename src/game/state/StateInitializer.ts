import { GameState } from "./GameState";

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
      camera: { position: { x: 0, y: 0 }, width: 10, height: 5 },
      aspectRatio: 1,
    };
  }
}