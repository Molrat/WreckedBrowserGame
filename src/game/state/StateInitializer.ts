import { GameState } from "./GameState";

export class StateInitializer {
  static createInitialGameState(): GameState {
    return {
      entities: [],
      deadEntities: [],
      ui: {
        openMenu: 'intro',
        previousMenuBeforeDisconnect: null,
        startMenu:{
          playerConnections: Array.from({ length: 4 }, () => ({ status: 'notJoined', controllerId: null }))
        },
        currentRound: 1,
        maxRounds: 5,
        highestPlatformWithSpawnedWeapon: 0,
        countdown: null,
      },
      time: { total: 0 },
      input: {
        previousGamepads: [],
        gamePads: []
      },
      camera: { position: { x: 0, y: 0 }, velocity: { x: 0, y: 0 }, width: 10, height: 5, widthVelocity: 0, heightVelocity: 0 },
      aspectRatio: 1,
    };
  }
}