import { Movable } from '@/game/state/components/Movable';
import { Damaging } from '@/game/state/components/Damaging';
import { Positionable } from '@/game/state/components/Positionable';
import { HeatSeeking } from '@/game/state/components/HeatSeeking';

export interface IHomingProjectile extends Positionable, Movable, Damaging, HeatSeeking {
}
