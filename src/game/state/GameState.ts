import type { Identifiable } from './components/Identifiable';
import type { UIState } from './ui/UIState';
import type { InputState } from './input/InputState';

export type GameState = {
  input: InputState;
  entities: Identifiable[];
  ui: UIState;
  time: { total: number };
};