import type { Identifiable } from '../../state/components/Identifiable';
import { IControllable } from '../Controllable/IControllable';
import { ICarControllable } from './ICarControllable';

export function isCarControllable(e: Identifiable): e is Identifiable & ICarControllable & IControllable & 
  {  
    frontWheelAngle: number,
    maxSteeringAngle: number,
    maxSteeringWheelAngle: number
  } 
{
  return 'velocity' in e && 'throttle' in e && 'currentGamepad' in e;
}
