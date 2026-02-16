import { scale, Vector2 } from "@/math/Vector2";

export const LASER_CANNON_SHAPE: Vector2[] = [
  { x: -0.5, y: -0.3 },
  { x: 0.5, y: -0.2 },
  { x: 0.7, y: 0 },
  { x: 0.5, y: 0.2 },
  { x: -0.5, y: 0.3 },
].map(v => scale(v, 2)); // Scale up for better visibility

export const LASER_CANNON_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const LASER_CANNON_FILL = '#0a2a4a';
export const LASER_CANNON_BORDER = '#00ffff';
export const LASER_CANNON_DEPTH = 4;

export const LASER_BEAM_LENGTH = 50;
export const LASER_BEAM_WIDTH = 0.2;
export const LASER_BEAM_SPEED = 300; // m/s
export const LASER_BEAM_LIFETIME = 0.3;
export const LASER_BEAM_DAMAGE = 20;
export const LASER_BEAM_IMPULSE = 8000;
export const LASER_BEAM_FILL = '#ff00ff';
export const LASER_BEAM_BORDER = '#ff0080';
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
export const MACHINE_GUN_FILL = '#1a3a1a';
export const MACHINE_GUN_BORDER = '#39ff14';
export const MACHINE_GUN_DEPTH = 4;
export const MACHINE_GUN_AMMO = 30;
export const MACHINE_GUN_FIRE_RATE = 10; // shots per second

// ── Machine Gun Bullet ───────────────────────────────
export const BULLET_LENGTH = 0.4;
export const BULLET_WIDTH = 0.15;
export const BULLET_SPEED = 80;    // m/s
export const BULLET_LIFETIME = 5;
export const BULLET_DAMAGE = 4;
export const BULLET_IMPULSE = 3000;
export const BULLET_FILL = '#1a0a2a';
export const BULLET_BORDER = '#ffff00';
export const BULLET_DEPTH = 5;

const OCT_R = 1.0;
const A = OCT_R * Math.cos(Math.PI / 8);
const B = OCT_R * Math.sin(Math.PI / 8);

// ── Mine Dropper ─────────────────────────────────────
export const MINE_DROPPER_SHAPE: Vector2[] = [
  { x: A, y: B },
  { x: B, y: A },
  { x: -B, y: A },
  { x: -A, y: B },
  { x: -A, y: -B },
  { x: -B, y: -A },
  { x: B, y: -A },
  { x: A, y: -B },
];

export const MINE_DROPPER_MOUNT_OFFSET: Vector2 = { x: -1.5, y: 0 };
export const MINE_DROPPER_FILL = '#1a0a2a';
export const MINE_DROPPER_BORDER = '#ff00ff';
export const MINE_DROPPER_DEPTH = 4;
export const MINE_DROPPER_AMMO = 3;

// ── Mine Projectile ──────────────────────────────────

export const MINE_SHAPE: Vector2[] = [
  { x: A, y: B },
  { x: B, y: A },
  { x: -B, y: A },
  { x: -A, y: B },
  { x: -A, y: -B },
  { x: -B, y: -A },
  { x: B, y: -A },
  { x: A, y: -B },
];
export const MINE_LIFETIME = 30;
export const MINE_DAMAGE = 25;
export const MINE_IMPULSE = 20000;
export const MINE_FILL = '#1a0a2a';
export const MINE_BORDER = '#ff00ff';
export const MINE_DEPTH = 1;

// ── Missile Launcher ─────────────────────────────────
export const MISSILE_LAUNCHER_SHAPE: Vector2[] = [
  { x: -0.6, y: -0.35 },
  { x: 0.4, y: -0.25 },
  { x: 0.7, y: 0 },
  { x: 0.4, y: 0.25 },
  { x: -0.6, y: 0.35 },
].map(v => scale(v, 2));

export const MISSILE_LAUNCHER_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const MISSILE_LAUNCHER_FILL = '#2a0a0a';
export const MISSILE_LAUNCHER_BORDER = '#ff4400';
export const MISSILE_LAUNCHER_DEPTH = 4;
export const MISSILE_LAUNCHER_AMMO = 3;

// ── Missile Projectile ───────────────────────────────
export const MISSILE_LENGTH = 1.2;
export const MISSILE_WIDTH = 0.3;
export const MISSILE_SPEED = 1;
export const MISSILE_LIFETIME = 8;
export const MISSILE_DAMAGE = 30;
export const MISSILE_IMPULSE = 15000;
export const MISSILE_FILL = '#ff2200';
export const MISSILE_BORDER = '#ff8800';
export const MISSILE_DEPTH = 5;
export const MISSILE_HOMING_FORCE = 400;
export const MISSILE_THRUST_FORCE = 100;
export const MISSILE_HOMING_RANGE = 80;
export const MISSILE_HOMING_FOV = Math.PI * 0.75; // 135° cone
