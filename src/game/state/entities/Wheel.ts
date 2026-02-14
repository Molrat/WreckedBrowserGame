import { Identifiable } from '@/game/state/components/Identifiable';
import { Physical } from '@/game/state/components/Physical';
import { Mountable } from '@/game/state/components/Mountable';

export type Wheel = Identifiable & Physical & Mountable & {
  isFrontWheel: boolean;
};
