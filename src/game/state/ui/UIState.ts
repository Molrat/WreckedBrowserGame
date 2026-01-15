import { StartMenuState } from "./StartMenuState";

export type UIState = {
  openMenu: 'start' | 'pause' | 'controllerTest' | 'reconnectControllerMenu' | null;
  // Stores the menu that was active before switching to reconnectControllerMenu
  previousMenuBeforeDisconnect: 'start' | 'pause' | 'controllerTest' | null;
  startMenu: StartMenuState;
};
