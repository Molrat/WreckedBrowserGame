import { Identifiable } from '@/game/state/components/Identifiable';
import { IFrontWheel } from './IFrontWheel';

export function isFrontWheel(e: Identifiable): e is Identifiable & IFrontWheel {
  return 'isFrontWheel' in e && e.isFrontWheel === true && 'mountedOnPlayerId' in e;
}
