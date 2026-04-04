import type { Identifiable } from '@/game/state/components/Identifiable';
import type { UIState } from '@/game/state/ui/UIState';
import type { InputState } from '@/game/state/input/InputState';
import type { Camera } from '@/game/state/components/camera/Camera';
import type { GameSettings } from '@/game/state/ui/GameSettings';

export type GameState = {
  input: InputState;
  entities: Identifiable[];
  deadEntities: Identifiable[];
  ui: UIState;
  settings: GameSettings;
  time: { total: number };
  camera: Camera;
  aspectRatio: number;
};