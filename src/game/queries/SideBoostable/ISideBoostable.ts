import type { AppliedImpulse } from '@/game/state/components/physics/AppliedImpulse';
import type { GamepadState } from '@/game/state/input/GamepadState';

export interface ISideBoostable {
  impulses: AppliedImpulse[];
  currentGamepad: GamepadState;
  sideBoostCooldown: number;
  sideBoostCooldownMax: number;
  sideBoostImpulse: number;
  orientation: number;
}
