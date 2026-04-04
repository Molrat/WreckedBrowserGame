import { StartMenuState } from "./StartMenuState";
import { Countdown } from "./Countdown";
import { RoundWon } from "./RoundWon";
import { GameSettings } from "./GameSettings";
import { SettingsMenuState } from "./SettingsMenuState";

export type MenuType = 'intro' | 'start' | 'settingsMenu' | 'pause' | 'reconnectControllerMenu' | 'inbetweenLevels' | 'endOfGame' | null;

export type UIState = {
  openMenu: MenuType;
  // Stores the menu that was active before switching to reconnectControllerMenu
  previousMenuBeforeDisconnect: 'start' | 'pause' | 'endOfGame' | 'inbetweenLevels' | null;
  startMenu: StartMenuState;
  settings: GameSettings;
  settingsMenu: SettingsMenuState;
  currentRound: number;     // 1-5
  maxPoints: number;        // 5
  highestPlatformWithSpawnedWeapon: number;
  highestPlatformWithCarouselDecision: number;
  countdown: Countdown | null;
  roundWon: RoundWon | null;
};
