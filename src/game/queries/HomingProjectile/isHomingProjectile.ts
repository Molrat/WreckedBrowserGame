import { Identifiable } from '@/game/state/components/Identifiable';
import { IHomingProjectile } from './IHomingProjectile';

export function isHomingProjectile(e: Identifiable): e is Identifiable & IHomingProjectile {
  return 'isHeatSeeking' in e;
}
