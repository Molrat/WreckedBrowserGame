import { Vector2 } from '@/math/Vector2';

// Player color palette - neon style
export const PLAYER_COLOR_PALETTE = [
  ['#00ffff', 'cyan'],
  ['#39ff14', 'lime'],
  ['#0080ff', 'blue'],
  ['#ff00ff', 'magenta'],
  ['#ff0080', 'pink'],
  ['#00ff80', 'teal'],
  ['#ffff00', 'yellow'],
  ['#ff6600', 'orange'],
];

// Car body shape (meters, forward=+X, left=+Y in math coords)
export const CAR_SHAPE: Vector2[] = [
  { x: -1.5, y: -0.8 },  // rear-right
  { x: -1.5, y: 0.8 },   // rear-left
  { x: 1.5, y: 0.8 },    // front-left
  { x: 1.5, y: -0.8 },   // front-right
];

export const CAR_FILL_COLOR = '#270027';
export const CAR_BORDER_COLOR = (colorFromPalette: string): string | null => colorFromPalette;
export const CAR_BORDER_WIDTH = 3;
export const CAR_DEPTH = 2;

// Tire/wheel appearance
export const TIRE_LENGTH = 1;
export const TIRE_WIDTH = 0.5;
export const TIRE_SHAPE: Vector2[] = [
  { x: -TIRE_LENGTH / 2, y: -TIRE_WIDTH / 2 },
  { x: TIRE_LENGTH / 2, y: -TIRE_WIDTH / 2 },
  { x: TIRE_LENGTH / 2, y: TIRE_WIDTH / 2 },
  { x: -TIRE_LENGTH / 2, y: TIRE_WIDTH / 2 },
];
export const TIRE_FILL_COLOR = '#1a1a1a';
export const TIRE_BORDER_COLOR = '#404040';
export const TIRE_BORDER_WIDTH = 1;
export const TIRE_DEPTH = 3;
