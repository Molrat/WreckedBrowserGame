import type { Damageable } from '@/game/state/components/Damageable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Scorable } from '@/game/state/components/Scorable';
import type { SideBoostable } from '@/game/state/components/SideBoostable';
import { Controllable } from '@/game/state/components/Controllable';
import { WithCarState } from '@/game/state/components/car/WithCarState';
import { Movable } from '../../components/Movable';

export type Player = 
  Identifiable 
  & Physical 
  & Movable 
  & Controllable 
  & WithCarState 
  & Damageable 
  & Scorable
  & SideBoostable;