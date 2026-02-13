import { StartMenuState } from "./StartMenuState";

export type MenuType = 'start' | 'pause' | 'controllerTest' | 'reconnectControllerMenu' | 'inbetweenLevels' | 'endOfGame' | null;

export type UIState = {
  openMenu: MenuType;
  // Stores the menu that was active before switching to reconnectControllerMenu
  previousMenuBeforeDisconnect: 'start' | 'pause' | 'controllerTest' | null;
  startMenu: StartMenuState;
  currentRound: number;     // 1-5
  maxRounds: number;        // 5
  highestPlatformWithSpawnedWeapon: number; // Track highest platform that has had a weapon spawned on it
};
