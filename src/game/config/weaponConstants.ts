import { Vector2 } from "@/math/Vector2";

export const WEAPON_SPAWN_INTERVAL = 1;
export const MAX_WEAPONS_ON_GROUND = 15;

export const LASER_CANNON_SHAPE: Vector2[] = [
  { x: -0.5, y: -0.3 },
  { x: 0.5, y: -0.2 },
  { x: 0.7, y: 0 },
  { x: 0.5, y: 0.2 },
  { x: -0.5, y: 0.3 },
];

export const LASER_CANNON_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const LASER_CANNON_FILL = '#556677';
export const LASER_CANNON_BORDER = '#00ffff';
export const LASER_CANNON_DEPTH = 4;

export const LASER_BEAM_LENGTH = 500;
export const LASER_BEAM_WIDTH = 0.2;
export const LASER_BEAM_LIFETIME = 0.3;
export const LASER_BEAM_DAMAGE = 50;
export const LASER_BEAM_IMPULSE = 8000;
export const LASER_BEAM_FILL = '#ff0000';
export const LASER_BEAM_BORDER = '#ff4444';
export const LASER_BEAM_DEPTH = 5;
