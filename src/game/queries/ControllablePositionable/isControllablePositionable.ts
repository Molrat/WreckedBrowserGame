import type { Identifiable } from '@/game/state/components/Identifiable';
import type { IControllablePositionable } from './IControllablePositionable';

export function isControllablePositionable(e: Identifiable): e is Identifiable & IControllablePositionable {
  return 'position' in e && 'currentGamepad' in e;
}
