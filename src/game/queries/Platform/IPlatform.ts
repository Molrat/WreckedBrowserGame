import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Physical } from '@/game/state/components/Physical';
import type { Textable } from '@/game/state/components/Textable';

export interface IPlatform extends Identifiable, Physical {
  platformIndex: number;
  nextPlatformId: string | null;
}
