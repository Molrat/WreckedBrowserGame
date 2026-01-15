import type { Player } from './Player';
import { nextId } from '../../../utils/id';

export class PlayerFactory {
  static create(controllerId: string): Player {
    const idx = Number(controllerId) || 0;
    const palette = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#14b8a6', '#f97316', '#eab308'];
    const color = palette[idx % palette.length];
    return {
      id: nextId(),
      position: { x: 400, y: 300 },
      orientation: 0,
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      // Damageable
      health: 100,
      maxHealth: 100,
      // Renderable
      shape: { type: 'triangle', base: 24, height: 24},
      color,
      // Controllable
      controllerId,
      currentGamepad: {
        leftStick: { x: 0, y: 0 },
        rightStick: { x: 0, y: 0 },
        leftTrigger: 0,
        rightTrigger: 0,
        triangle: false,
        cross: false,
        square: false,
        circle: false,
        l1: false,
        r1: false,
        l2: false,
        r2: false,
        l3: false,
        r3: false,
        dpadUp: false,
        dpadDown: false,
        dpadLeft: false,
        dpadRight: false,
        start: false,
        select: false,
        home: false,
      },
      previousGamepad: {
        leftStick: { x: 0, y: 0 },
        rightStick: { x: 0, y: 0 },
        leftTrigger: 0,
        rightTrigger: 0,
        triangle: false,
        cross: false,
        square: false,
        circle: false,
        l1: false,
        r1: false,
        l2: false,
        r2: false,
        l3: false,
        r3: false,
        dpadUp: false,
        dpadDown: false,
        dpadLeft: false,
        dpadRight: false,
        start: false,
        select: false,
        home: false,
      },
    };
  }
}
