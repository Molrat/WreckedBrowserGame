import type { Damageable } from '../components/Damageable';
import type { Physical } from '../components/Physical';
import type { Identifiable } from '../components/Identifiable';
import { Controllable } from '../components/Controllable';
import { Drivable } from '../components/controllableCar/Drivable';

export type Player = Identifiable & Drivable & Damageable & Physical & Controllable;