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
          playerConnections: Array.from({ length: 4 }, () => ({ status: 'notJoined', controllerId: null })),
        },
        settings: {
          carouselEnabled: false,
        },
        settingsMenu: {
          selectedIndex: 0,
        },
        currentRound: 1,
        maxPoints:24,
        highestPlatformWithSpawnedWeapon: 0,
        highestPlatformWithCarouselDecision: 0,
        countdown: null,
        roundWon: null,
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