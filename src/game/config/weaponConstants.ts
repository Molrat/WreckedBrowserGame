import { scale, Vector2 } from "@/math/Vector2";

export const LASER_CANNON_SHAPE: Vector2[] = [
  { x: -0.5, y: -0.3 },
  { x: 0.5, y: -0.2 },
  { x: 0.7, y: 0 },
  { x: 0.5, y: 0.2 },
  { x: -0.5, y: 0.3 },
].map(v => scale(v, 2)); // Scale up for better visibility

export const LASER_CANNON_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const LASER_CANNON_FILL = '#556677';
export const LASER_CANNON_BORDER = '#00ffff';
export const LASER_CANNON_DEPTH = 4;

export const LASER_BEAM_LENGTH = 500;
export const LASER_BEAM_WIDTH = 0.2;
export const LASER_BEAM_LIFETIME = 0.3;
export const LASER_BEAM_DAMAGE = 20;
export const LASER_BEAM_IMPULSE = 8000;
export const LASER_BEAM_FILL = '#ff0000';
export const LASER_BEAM_BORDER = '#ff4444';
export const LASER_BEAM_DEPTH = 5;

// ── Machine Gun ──────────────────────────────────────
export const MACHINE_GUN_SHAPE: Vector2[] = [
  { x: -0.4, y: -0.2 },
  { x: 0.6, y: -0.1 },
  { x: 0.8, y: 0 },
  { x: 0.6, y: 0.1 },
  { x: -0.4, y: 0.2 },
].map(v => scale(v, 2));

export const MACHINE_GUN_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const MACHINE_GUN_FILL = '#667744';
export const MACHINE_GUN_BORDER = '#ccff44';
export const MACHINE_GUN_DEPTH = 4;
export const MACHINE_GUN_AMMO = 30;
export const MACHINE_GUN_FIRE_RATE = 10; // shots per second

// ── Machine Gun Bullet ───────────────────────────────
export const BULLET_LENGTH = 0.4;
export const BULLET_WIDTH = 0.15;
export const BULLET_SPEED = 80;    // m/s
export const BULLET_LIFETIME = 1.5;
export const BULLET_DAMAGE = 4;
export const BULLET_IMPULSE = 3000;
export const BULLET_FILL = '#ffcc00';
export const BULLET_BORDER = '#ff8800';
export const BULLET_DEPTH = 5;
