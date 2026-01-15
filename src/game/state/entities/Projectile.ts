import type { Acceleratable } from '@/game/state/components/Acceleratable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';

export type Projectile = Identifiable & Acceleratable & Physical;