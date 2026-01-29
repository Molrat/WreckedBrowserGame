import { Identifiable } from '@/game/state/components/Identifiable';
import { IPlayer } from './IPlayer';

export function isPlayer(e: Identifiable): e is IPlayer {
  return 'controllerId' in e && 'health' in e && 'score' in e;
}
