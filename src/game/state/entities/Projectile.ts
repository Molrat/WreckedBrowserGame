import type { Movable } from '@/game/state/components/Movable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Damaging } from '@/game/state/components/Damaging';
import { Damageable } from '../components/Damageable';

export type Projectile = Identifiable & Physical & Movable & Damaging & Damageable &{
  lifetime: number;
  maxLifetime: number;
  fades: boolean;
};