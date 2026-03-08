import type { Identifiable } from '@/game/state/components/Identifiable';
import type { IBoostable } from './IBoostable';

export function isBoostable(e: Identifiable): e is Identifiable & IBoostable {
  return 'impulses' in e && 'currentGamepad' in e && 'boostCooldown' in e;
}
