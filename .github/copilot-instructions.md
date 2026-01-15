# Copilot Instructions for TypeScript ECS-Style Game

## 1. Core Principles

### Data-Oriented / Functional Style !!!IMPORTANT!!!
- Entity component system (ECS) architecture. PLEASE STICK WITH THIS AT ALL COST.
- GameState is plain data build from type objects (no classes or interfaces)
- Systems manipulate GameState. They apply logic via INTERFACES.
- Queries filter entities by interface to feed the logic of systems
- Systems can emit events to event bus.
- Events are used for side effects that do not affect the game state!
- GameState rendering reads GameState ONLY.
- Effects rendering read events ONLY.
- soundplayers read events ONLY.
- Special input systems read IO to change gameState (current and previous controls are part of the gamestate).

### STRICT RULES:
- NEVER USE ANY TYPE!!
- KEEP ALL FILES SMALLER THAN 100 LINES! SMALLER IF POSSIBLE!!
- COMPOSITION OF GAMESTATE ONLY VIA INTERSECTIONS OF TYPES (&)!
- SYSTEMS ONLY USE QUERIES TO FILTER ENTITIES!!
- SYSTEMS ONLY APPLY LOGIC ON FILTERED ENTITIES VIA INTERFACES AS INPUT!!
- COMPOSITION TYPES ARE NOT ALLOWED IN SYSTEMS ONLY INTERFACES!!
- EACH QUERY HAS ITS OWN FOLDER FOR A QUERY FUNCTION AND THE RESULTING INTERFACE.
- QUERIES RETURN LIST OF INTERFACES, NOT TYPES!!
- RENDERING DONE AS MUCH AS POSSIBLE VIA COMMON RENDERING HELPERS.
- RENDERERS ARE NOT ALLOWED TO DIRECTLY CALL METHODS ON CTX!! CREATE NEW STATIC HELPER FUNCTION IN COMMON FOLDERIF NEEDED.
- SEE GAMELOOP.TS FOR FLOW OF LOGIC.
- All rendering is done using HTML Canvas 2D context (CanvasRenderingContext2D).
- BUILD HELPER FUNCTIONS IN COMMON FOLDER FOR RENDERING REPETITIVE SHAPES/OBJECTS.
- NEVER multiple classes/types/interfaces in one file.
- BREAK FUNCTIONS AND CLASSES INTO SMALLER ONES, ALWAYS!!

## 3. Folder Structure

src/
├─ game/
│  ├─ state/          # Pure data: entities & components
│  │  ├─ GameState.ts # type containing entire state of the game
│  │  ├─ components/  # Identifiable.ts, Movable.ts, Damageable.ts
│  │  └─ entities/    # Player.ts, Enemy.ts, Projectile.ts
│  ├─ systems/        # Game logic systems
│  ├─ queries/        # Runtime type guards (e.g., IMovable) for filtering entities for systems
│  ├─ loop/           # Game loop orchestration
│  ├─ events/         # Side-effect events
│  └─ config/         # Constants, balance
├─ deviceInput/       # Input buffer / adapters
├─ deviceOutput/      # Output: rendering, sound
│  ├─ render/
│  │  ├─ common/
│  │  ├─ effects/
│  │  ├─ gameState/  # Rendering based on GameState
│  │  |  ├─ ui/      # UI rendering (HUD, menus)
│  │  |  ├─ world/   # world and entity rendering
│  ├─ soundPlayers/         
│  ├─ effects/        # Event-driven visual effects / animations
├─ soundPlayers/      # Event-driven sound playback systems
├─ math/              # Vector math, collision functions
├─ assets/            # Sprites, sounds, other assets
├─ utils/             # Utility functions, id generators, RNG
└─ main.ts

Tests folder mirrors game/systems for clarity.
Queries are separate from systems for runtime filtering.
Input adapters live outside GameState.

Examples:

function isMovable(e: Entity): e is Entity & IMovable {
  return 'position' in e && 'velocity' in e;
}