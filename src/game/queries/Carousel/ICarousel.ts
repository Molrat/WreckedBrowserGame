import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Physical } from '@/game/state/components/Physical';
import type { SpawnPlatformTracked } from '@/game/state/components/SpawnPlatformTracked';
import type { CarouselSpinRate } from '@/game/state/components/CarouselSpinRate';

export interface ICarousel extends Identifiable, Physical, SpawnPlatformTracked, CarouselSpinRate {}
