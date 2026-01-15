import type { Damageable } from '@/game/state/components/Damageable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';
import { Controllable } from '@/game/state/components/Controllable';
import { Drivable } from '@/game/state/components/controllableCar/Drivable';

export type Player = Identifiable & Drivable & Damageable & Physical & Controllable;