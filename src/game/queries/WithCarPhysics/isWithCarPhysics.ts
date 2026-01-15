import type { Identifiable } from '../../state/components/Identifiable';
import { ICarState } from './ICarState';

export function isWithCarPhysics(e: Identifiable): e is Identifiable & ICarState {
  return 'position' in e && 'angularVelocity' in e && 'wheelBase' in e && 'throttle' in e;
}
