import type { Movable } from '@/game/state/components/Movable';
import type { Damageable } from '@/game/state/components/Damageable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';

export type Enemy = Identifiable & Movable & Damageable & Physical;
