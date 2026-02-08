import type { Identifiable } from '@/game/state/components/Identifiable';
import { IMovable } from '@/game/queries/Movable/IMovable';

export function isMovable(e: Identifiable): e is Identifiable & IMovable {
  return 'position' in e && 'velocity' in e && 'angularVelocity' in e && 'mass' in e && 'forces' in e;
}
