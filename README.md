# Neon Strike: Carmageddon
Welcome developer and gamer!
This is a controller based local multiplayer browser game, made in typescript.
for open to do's, see TODO.md

## ECS architecture
- GameState is plain data, no logic!
- Systems are classes that mutate state deterministically. Each frame they do this in series.
- Device inputs are captured into the state at the start of each frame
- After systems modified state, the renderers render the screen
- Systems can also emit events to the eventBus. those are captured by graphic effects and soundplayers. The events do not modify the state!
- the game loop orchestrates all this each frame: first state is updated with systems, the gamestate is renderered on the screen, then effects are drawn and sounds are played based on emitted events by the systems.

## Quick Start

### Prerequisites: 
- Node.js 18+ and npm.

### Install and run:

```bash
npm install
npm run dev
```

Open the auto-launched URL.

Test:

```bash
npm run test
```

## Develop pro tips:
- Any entity in the gamestate entities with the Physical type will be drawn automatically!
- Any entity with Movable type can be moved around by changing velocity, position, angular 
velocity etc. OR you can add forces/impulses to them and let the physics do the work!
- Any entity with the Mountable type can be picked up by players and the entity will be mounted on the roof of the car.
- Use the ICameraRendererAPI interface to draw world coordinates.
- Use the IScreenRendererAPI interface to draw stuff directly on the screen, in pixel coordinates.
- facing up in the world is increasing Y! We use the mathematical coordinate system for the world coordinates, so vector calculations are simple. No worries: The ICameraRendererAPI implementation already makes sure y is mirrored when the world coordinates are transformed to pixel coordinates.