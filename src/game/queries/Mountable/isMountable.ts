import { Identifiable } from '@/game/state/components/Identifiable';
import { Mountable } from '@/game/state/components/Mountable';

export function isMountable(e: Identifiable): e is Identifiable & Mountable {
  return 'mountedOnPlayerId' in e;
}
