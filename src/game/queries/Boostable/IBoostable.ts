import type { AppliedImpulse } from '@/game/state/components/physics/AppliedImpulse';
import type { GamepadState } from '@/game/state/input/GamepadState';

export interface IBoostable {
  impulses: AppliedImpulse[];
  currentGamepad: GamepadState;
  boostCooldown: number;
  boostCooldownMax: number;
  boostImpulse: number;
  orientation: number;
}
