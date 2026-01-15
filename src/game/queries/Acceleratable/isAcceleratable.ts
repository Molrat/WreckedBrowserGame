import type { Identifiable } from '@/game/state/components/Identifiable';
import { IAcceleratable } from '@/game/queries/Acceleratable/IAcceleratable';

export function isAcceleratable(e: Identifiable): e is Identifiable & IAcceleratable {
  return 'position' in e && 'velocity' in e && 'acceleration' in e;
}
