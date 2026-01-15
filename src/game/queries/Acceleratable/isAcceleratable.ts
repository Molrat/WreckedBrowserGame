import type { Identifiable } from '../../state/components/Identifiable';
import { IAcceleratable } from './IAcceleratable';

export function isAcceleratable(e: Identifiable): e is Identifiable & IAcceleratable {
  return 'position' in e && 'velocity' in e && 'acceleration' in e;
}
