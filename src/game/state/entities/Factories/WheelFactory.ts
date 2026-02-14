import type { Wheel } from '@/game/state/entities/Wheel';
import { nextId } from '@/utils/id';
import {
  TIRE_SHAPE,
  TIRE_FILL_COLOR,
  TIRE_BORDER_COLOR,
  TIRE_BORDER_WIDTH,
  TIRE_DEPTH,
} from '@/game/config/carAppearanceConstants';
import { CAR_PHYSICS } from '@/game/config/carPhysicsConstants';
import type { Vector2 } from '@/math/Vector2';

type WheelPosition = 'FL' | 'FR' | 'RL' | 'RR';

const WHEEL_OFFSETS: Record<WheelPosition, { x: number; y: number; isFront: boolean }> = {
  FL: { x: CAR_PHYSICS.lengthToFrontAxle, y: CAR_PHYSICS.trackHalfWidth, isFront: true },
  FR: { x: CAR_PHYSICS.lengthToFrontAxle, y: -CAR_PHYSICS.trackHalfWidth, isFront: true },
  RL: { x: -CAR_PHYSICS.lengthToRearAxle, y: CAR_PHYSICS.trackHalfWidth, isFront: false },
  RR: { x: -CAR_PHYSICS.lengthToRearAxle, y: -CAR_PHYSICS.trackHalfWidth, isFront: false },
};

function createWheel(playerId: string, pos: WheelPosition): Wheel {
  const offset = WHEEL_OFFSETS[pos];
  return {
    id: nextId(),
    position: { x: 0, y: 0 },
    orientation: 0,
    shape: TIRE_SHAPE.map((v: Vector2) => ({ ...v })),
    fillColor: TIRE_FILL_COLOR,
    borderColor: TIRE_BORDER_COLOR,
    borderWidth: TIRE_BORDER_WIDTH,
    depth: TIRE_DEPTH,
    mountedOnPlayerId: playerId,
    relativePosition: { x: offset.x, y: offset.y },
    relativeOrientation: 0,
    isFrontWheel: offset.isFront,
  };
}

export function createWheelsForPlayer(playerId: string): Wheel[] {
  return [
    createWheel(playerId, 'FL'),
    createWheel(playerId, 'FR'),
    createWheel(playerId, 'RL'),
    createWheel(playerId, 'RR'),
  ];
}
