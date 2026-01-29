import type { Player } from '@/game/state/entities/Player';
import { nextId } from '@/utils/id';

export class PlayerFactory {
  static create(controllerId: string): Player {
    const idx = Number(controllerId) || 0;
    const palette = ['#44c7ef', '#22c55e', '#3b82f6', '#f59e0b', '#a855f7', '#14b8a6', '#f97316', '#eab308'];
    const color = palette[idx % palette.length];
    return {
      id: nextId(),
      position: { x: 400, y: 300 },
      orientation: 0,
      velocity: { x: 0, y: 0 },
      // Damageable
      health: 100,
      maxHealth: 100,
      // Renderable - simple car polygon (meters, oriented forward=right, 0° = +X)
      shape: [
          { x: -1.7, y: -0.8 },  // rear-left
          { x: -1.7, y: 0.8 },   // rear-right
          { x: 1.3, y: 0.9 },    // front-right fender
          { x: 1.7, y: 0.0 },    // nose
          { x: 1.3, y: -0.9 },   // front-left fender
        ],
      fillColor: color,
      borderColor: '#000000',
      borderWidth: 2,
      depth: 2,  // players above platforms
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
      centerOfMassOffset: 0.0,    // m (0 = CoM centered)
      lengthToFrontAxle: 1.25,    // m
      lengthToRearAxle: 1.25,     // m
      trackHalfWidth: 0.75,       // m
      wheelRadius: 0.3,           // m

      maxSteeringAngle: Math.PI / 6, // rad (30°)
      maxSteeringWheelAngle: Math.PI * 3, // 540°
      steeringResponse: 5,
      steeringSpeedReductionK: 0.01,

      engineForce: 16000,          // N (AWD)
      brakeForce: 16000,          // N

      tireGripFront: 1,
      tireGripRear: 1,
      tireMu: 1,
      tireGripBuildUp: 1,          // longitudinal stiffness (how fast grip builds with slip)
      tireGripDropOff: 1,            // longitudinal falloff (fraction, higher = more drop after peak)
      tireGripBuildUpLatScalar: 1.0,  // lateral stiffness = buildUp * this
      tireGripDropOffLatScalar: 1.0,   // lateral dropOff = dropOff * this
      maxGripLatScalar: 1.4,           // lateral peak grip multiplier (>1 = more cornering than traction grip)
      driftGripMultiplier: 0.7,

      rollingResistance: 800,     // N
      airDragCoefficient: 5.0,     // used with v² - gives ~200 km/h top speed

      // car controller state:
      throttle: 0,
      brake: 0,
      steeringWheelAngle: 0,
      handBrake: 0,
      // car state
      angularVelocity: 0,
      tiltAngle: 0,
      frontWheelAngle: 0,
      omegaFL: 0,
      omegaFR: 0,
      omegaRL: 0,
      omegaRR: 0,
      slipRatioFL: 0,
      slipRatioFR: 0,
      slipRatioRL: 0,
      slipRatioRR: 0,
      slipAngleFL: 0,
      slipAngleFR: 0,
      slipAngleRL: 0,
      slipAngleRR: 0,
      forceFL: { x: 0, y: 0 },
      forceFR: { x: 0, y: 0 },
      forceRL: { x: 0, y: 0 },
      forceRR: { x: 0, y: 0 },
      // Scorable
      score: 0,
      roundScores: [],
      placement: 0,
    };
  }
}
