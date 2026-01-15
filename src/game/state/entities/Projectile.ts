import type { Acceleratable } from '../components/Acceleratable';
import type { Physical } from '../components/Physical';
import type { Identifiable } from '../components/Identifiable';

export type Projectile = Identifiable & Acceleratable & Physical;