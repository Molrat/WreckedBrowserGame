import type { Identifiable } from '@/game/state/components/Identifiable';
import type { UIState } from '@/game/state/ui/UIState';
import type { InputState } from '@/game/state/input/InputState';

export type GameState = {
  input: InputState;
  entities: Identifiable[];
  ui: UIState;
  time: { total: number };
};