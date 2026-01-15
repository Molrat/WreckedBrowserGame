import type { Acceleratable } from '@/game/state/components/Acceleratable';
import type { Damageable } from '@/game/state/components/Damageable';
import type { Physical } from '@/game/state/components/Physical';
import type { Identifiable } from '@/game/state/components/Identifiable';

export type Enemy = Identifiable & Acceleratable & Damageable & Physical;
