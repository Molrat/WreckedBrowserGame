import type { Player } from '@/game/state/entities/Player';
import { nextId } from '@/utils/id';

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
      // Damageable
      health: 100,
      maxHealth: 100,
      // Renderable
      shape: { type: 'triangle', base: 1.6, height: 3},
      color,
      // Controllable
      controllerId,
      currentGamepad: {
        id: controllerId,
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
        id: controllerId,
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
      // car properties
      mass: 1000,                 // kg
      inertia: 2800,              // kg·m²
      wheelBase: 2.5,             // m
      centerOfMassOffset: 0.3,    // m

      maxSteeringAngle: Math.PI / 6, // rad (30°)
      maxSteeringWheelAngle: Math.PI * 3, // 540°
      steeringResponse: 5,

      engineForce: 16000,          // N
      brakeForce: 12000,          // N

      tireGripFront: 1.05,
      tireGripRear: 0.95,
      driftGripMultiplier: 0.7,

      rollingResistance: 200,     // N
      airDragCoefficient: 0.4,     // used with v²

      // car controller state:
      throttle: 0,
      brake: 0,
      steeringWheelAngle: 0,
      handBrake: 0,
      // car state
      frontWheelsHaveTraction: true,
      rearWheelsHaveTraction: true,
      angularVelocity: 0,
    };
  }
}
