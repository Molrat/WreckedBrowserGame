import { describe, it, expect } from 'vitest';
import { MovementSystem } from '../../src/game/systems/MovementSystem';
import { createInitialGameState } from '../../src/game/state/GameState';

describe('MovementSystem', () => {
  it('moves movable entities by velocity * dt', () => {
    const state = createInitialGameState();
    state.entities.push({
      id: '1',
      kind: 'test',
      position: { x: 0, y: 0 },
      velocity: { x: 10, y: 0 },
      shape: 'rect',
      color: '#fff',
      size: 10,
    } as any);
    const sys = new MovementSystem();
    sys.update(state, 0.5);
    expect((state.entities[0] as any).position.x).toBe(5);
  });
});
