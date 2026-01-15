import type { Damageable } from '@/game/state/components/Damageable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';
import { Controllable } from '@/game/state/components/Controllable';
import { WithCarState } from '@/game/state/components/car/WithCarState';

export type Player = Identifiable & WithCarState & Damageable & Physical & Controllable;