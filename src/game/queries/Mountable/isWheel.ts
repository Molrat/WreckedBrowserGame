import { Identifiable } from '@/game/state/components/Identifiable';
import { Mountable } from '@/game/state/components/Mountable';

export function isFrontWheel(e: Identifiable): e is Identifiable & Mountable {
  return 'isFrontWheel' in e && 'mountedOnPlayerId' in e;
}
