import type { Acceleratable } from '../components/Acceleratable';
import type { Damageable } from '../components/Damageable';
import type { Physical } from '../components/Physical';
import type { Identifiable } from '../components/Identifiable';

export type Enemy = Identifiable & Acceleratable & Damageable & Physical;
