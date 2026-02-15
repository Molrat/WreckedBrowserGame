import { Movable } from '@/game/state/components/Movable';
import { Damaging } from '@/game/state/components/Damaging';
import { Positionable } from '@/game/state/components/Positionable';
import { HeatSeaking } from '@/game/state/entities/Projectile';

export interface IHomingProjectile extends Positionable, Movable, Damaging, HeatSeaking {
}
