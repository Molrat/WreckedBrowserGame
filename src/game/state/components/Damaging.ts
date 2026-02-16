import { ProjectileType } from './ProjectileType';

export type Damaging = {
  damage: number;
  ownerPlayerId: string;
  impulseMagnitude: number;
  destroyOnHit: boolean;
  projectileType: ProjectileType;
};
