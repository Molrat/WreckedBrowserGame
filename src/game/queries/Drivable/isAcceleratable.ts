import type { Identifiable } from '../../state/components/Identifiable';
import { IDrivable } from './IDrivable';

export function isDrivable(e: Identifiable): e is Identifiable & IDrivable {
  return 'position' in e && 'velocity' in e && 'throttle' in e;
}
