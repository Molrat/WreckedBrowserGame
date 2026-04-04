import { scale, Vector2 } from "@/math/Vector2";

// ── General ─────────────────────────────────────
export const SPIN_ON_HIT_MULTIPLIER = 2;
export const NR_OF_PLATFORMS_BETWEEN_WEAPON_SPAWNS = 6;
export const WEAPON_COUNT = 4;

// ── Laser Cannon ─────────────────────────────────────
export const LASER_CANNON_SHAPE: Vector2[] = [
  { x: -0.5, y: -0.3 },
  { x: 0.5, y: -0.2 },
  { x: 0.7, y: 0 },
  { x: 0.5, y: 0.2 },
  { x: -0.5, y: 0.3 },
].map(v => scale(v, 2));

export const LASER_CANNON_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const LASER_CANNON_FILL = '#0a2a4a';
export const LASER_CANNON_BORDER = '#00ffff';
export const LASER_CANNON_DEPTH = 4;

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
export const MACHINE_GUN_FIRE_RATE = 10;

// ── Mine Dropper ─────────────────────────────────────
const OCT_R = 1.0;
const A = OCT_R * Math.cos(Math.PI / 8);
const B = OCT_R * Math.sin(Math.PI / 8);

export const MINE_DROPPER_SHAPE: Vector2[] = [
  { x: A, y: B }, { x: B, y: A },
  { x: -B, y: A }, { x: -A, y: B },
  { x: -A, y: -B }, { x: -B, y: -A },
  { x: B, y: -A }, { x: A, y: -B },
];

export const MINE_DROPPER_MOUNT_OFFSET: Vector2 = { x: -1.5, y: 0 };
export const MINE_DROPPER_FILL = '#1a0a2a';
export const MINE_DROPPER_BORDER = '#ff00ff';
export const MINE_DROPPER_DEPTH = 4;
export const MINE_DROPPER_AMMO = 3;

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

// ── Missile Homing System ────────────────────────────
export const MISSILE_HOMING_FORCE = 800;
export const MISSILE_THRUST_FORCE = 20;
export const MISSILE_HOMING_RANGE = 80;
export const MISSILE_HOMING_FOV = Math.PI * 0.4;
export const MISSILE_ACTIVATION_DELAY = 1;

// ── Cannon ────────────────────────────────────────────
export const CANNON_SHAPE: Vector2[] = [
  { x: -0.5, y: -0.4 },
  { x: 0.3, y: -0.35 },
  { x: 0.7, y: -0.15 },
  { x: 0.9, y: 0 },
  { x: 0.7, y: 0.15 },
  { x: 0.3, y: 0.35 },
  { x: -0.5, y: 0.4 },
].map(v => scale(v, 1.5));

export const CANNON_MOUNT_OFFSET: Vector2 = { x: 0, y: 0 };
export const CANNON_FILL = '#2a2a0a';
export const CANNON_BORDER = '#ffdd00';
export const CANNON_DEPTH = 4;
export const CANNON_AMMO = 5;

// ── Booster ───────────────────────────────────────────
export const BOOSTER_SHAPE: Vector2[] = [
  { x: -0.5, y: -0.4 },
  { x: 0.4, y: -0.5 },
  { x: 0.4, y: 0.5 },
  { x: -0.5, y: 0.3 },
].map(v => scale(v, 1.8));

export const BOOSTER_MOUNT_OFFSET: Vector2 = { x: -1.5, y: 0 };
export const BOOSTER_FILL = '#2a2a0a';
export const BOOSTER_BORDER = '#ff0000';
export const BOOSTER_DEPTH = 4;
export const BOOSTER_AMMO = 20;
export const BOOSTER_FIRE_RATE = 15;
