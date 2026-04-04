import type { Identifiable } from '../components/Identifiable';
import type { Physical } from '../components/Physical';
import type { SpawnPlatformTracked } from '../components/SpawnPlatformTracked';
import type { CarouselSpinRate } from '../components/CarouselSpinRate';

export type Carousel = Identifiable & Physical & SpawnPlatformTracked & CarouselSpinRate;
