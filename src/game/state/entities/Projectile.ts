import type { Movable } from '@/game/state/components/Movable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Damaging } from '@/game/state/components/Damaging';
import { Damageable } from '../components/Damageable';
import { WithLifeSpan } from '../components/WithLifeSpan';
import { HeatSeeking } from '../components/HeatSeeking';

export type Projectile = Identifiable & Physical & Movable & Damaging & Damageable & WithLifeSpan & HeatSeeking;