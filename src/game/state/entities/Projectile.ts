import type { Movable } from '@/game/state/components/Movable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';

export type Projectile = Identifiable & Movable & Physical;