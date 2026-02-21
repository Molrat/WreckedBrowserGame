import type { Identifiable } from '@/game/state/components/Identifiable';
import type { ISideBoostable } from './ISideBoostable';

export function isSideBoostable(e: Identifiable): e is Identifiable & ISideBoostable {
  return 'impulses' in e && 'currentGamepad' in e && 'sideBoostCooldown' in e;
}
