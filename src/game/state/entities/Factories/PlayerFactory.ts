import type { Player } from '@/game/state/entities/player/Player';
import type { CarPart } from '@/game/state/entities/player/CarPart';
import { nextId } from '@/utils/id';
import { CAR_PHYSICS } from '@/game/config/carPhysicsConstants';
import { PLAYER_COLOR_PALETTE, CAR_SHAPE, CAR_BORDER_WIDTH, CAR_DEPTH, CAR_FILL_COLOR } from '@/game/config/carAppearanceConstants';
import { createWheelsForPlayer } from '@/game/state/entities/Factories/WheelFactory';
import { SIDE_BOOST } from '@/game/config/sideBoostConstants';

export class PlayerFactory {
  static create(controllerId: string): Player {
    const idx = Number(controllerId) || 0;
    const color = PLAYER_COLOR_PALETTE[idx % PLAYER_COLOR_PALETTE.length][0];
    const name = PLAYER_COLOR_PALETTE[idx % PLAYER_COLOR_PALETTE.length][1];
    return {
      id: nextId(),
      name,
      position: { x: 400, y: 300 },
      orientation: 0,
      velocity: { x: 0, y: 0 },
      // Movable physics
      mass: CAR_PHYSICS.mass,                 // kg
      momentOfInertia: CAR_PHYSICS.momentOfInertiaRelativeToMass * CAR_PHYSICS.mass,       // kg·m² (box approximation)
      forces: [],
      impulses: [],
      // Damageable
      health: 100,
      maxHealth: 100,
      // Renderable - simple car polygon (meters, oriented forward=right, 0° = +X)
      shape: CAR_SHAPE.map(v => ({ ...v })),
      fillColor: CAR_FILL_COLOR,
      borderColor: color,
      borderWidth: CAR_BORDER_WIDTH,
      depth: CAR_DEPTH,  // players above platforms
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
      lengthToFrontAxle: CAR_PHYSICS.lengthToFrontAxle,    // m from center
      lengthToRearAxle: CAR_PHYSICS.lengthToRearAxle,     // m from center
      trackHalfWidth: CAR_PHYSICS.trackHalfWidth,       // m (half of the distance between left and right wheels)
      wheelRadius: CAR_PHYSICS.wheelRadius,           // m

      maxSteeringAngle: CAR_PHYSICS.maxSteeringAngle, // rad (30°)
      maxSteeringWheelAngle: Math.PI * 3, // 540°
      steeringResponse: 5,
      steeringSpeedReductionK: 0.01,

      engineForce: CAR_PHYSICS.engineForce,
      brakeForce: CAR_PHYSICS.brakeForce,
      tireStiffness: CAR_PHYSICS.tireStiffness,
      tireMu: CAR_PHYSICS.tireMu,

      airDragCoefficient: CAR_PHYSICS.airDragCoefficient,

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
      forceFL: { x: 0, y: 0 },
      forceFR: { x: 0, y: 0 },
      forceRL: { x: 0, y: 0 },
      forceRR: { x: 0, y: 0 },
      // Scorable
      score: 0,
      roundScores: [],
      placement: 0,
      readyForNextRound: false,
      // SideBoostable
      sideBoostCooldown: 0,
      sideBoostCooldownMax: SIDE_BOOST.cooldown,
      sideBoostImpulse: SIDE_BOOST.impulse,
    };
  }

  static createWithWheels(controllerId: string): [Player, ...CarPart[]] {
    const player = PlayerFactory.create(controllerId);
    const wheels = createWheelsForPlayer(player.id);
    return [player, ...wheels];
  }
}
