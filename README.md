Browser Game Engine (TypeScript, ECS-Style)

Overview
- Deterministic, data-oriented core with plain types for state.
- Systems are classes that mutate state deterministically.
- Input adapters buffer external input; an InputSystem copies into GameState each frame.
- Renderer reads state only and draws to Canvas 2D; events trigger side effects.

Quick Start
- Prerequisites: Node.js 18+ and npm.

Install and run:

```bash
npm install
npm run dev
```

Open the auto-launched URL. Move the green square with WASD/Arrow keys.

Test:

```bash
npm run test
```

Project Structure
- [src/main.ts](src/main.ts): App entry, wires state, loop, input, renderers.
- [src/game/state](src/game/state): Pure data types and factories.
- [src/game/systems](src/game/systems): Deterministic systems (no DOM).
- [src/game/queries](src/game/queries): Runtime type guards for safe filtering.
- [src/game/loop](src/game/loop): Orchestrates frame update and render order.
- [src/game/events](src/game/events): EventBus for side-effect-only events.
- [src/input](src/input): Input adapters (keyboard/gamepad) buffering input.
	- InputState lives in GameState: [src/game/state/InputState.ts](src/game/state/InputState.ts)
- [src/render/world](src/render/world): World renderer for entities with Renderable.
- [src/render/ui](src/render/ui): UI renderer driven by UIState inside GameState.
- [src/render/animations](src/render/animations): Visual-only state (not part of GameState).
- [src/math](src/math): Vector math and collision helpers.
- [src/utils](src/utils): General utilities (e.g., id generator).
- [assets](assets): Sprites/assets placeholder.

Key Files
- [src/game/state/GameState.ts](src/game/state/GameState.ts): GameState and factory.
- [src/game/state/Entity.ts](src/game/state/Entity.ts): Base entity composition.
- [src/game/state/components](src/game/state/components): Movable, Damageable, Renderable.
- [src/game/state/entities/Player.ts](src/game/state/entities/Player.ts): Player factory.
- [src/game/systems/InputSystem.ts](src/game/systems/InputSystem.ts): Copies input buffer → GameState.
- [src/game/systems/PlayerControlSystem.ts](src/game/systems/PlayerControlSystem.ts): Maps input to velocity.
- [src/game/systems/MovementSystem.ts](src/game/systems/MovementSystem.ts): Applies velocity to position.
- [src/game/queries](src/game/queries): Type guards like isMovable/isRenderable.
- [src/game/loop/GameLoop.ts](src/game/loop/GameLoop.ts): Frame orchestration.
- [src/render/world/WorldRenderer.ts](src/render/world/WorldRenderer.ts): Geometric world rendering.
- [src/render/ui/UIRenderer.ts](src/render/ui/UIRenderer.ts): UI overlay based on UIState.

Notes
- State = truth, plain data. Systems = deterministic rules. Events = side effects only. Renderers = pure consumers.
- Files and functions aim to stay small and focused (<100 lines preferred).
