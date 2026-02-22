import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Physical } from '@/game/state/components/Physical';

export type Platform = Identifiable & Physical & {
  platformIndex: number;  // Sequential index (1, 2, 3, ...)
  nextPlatformId: string | null;  // ID of the next platform in the chain
};
