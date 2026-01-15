import { GameLoop } from './game/loop/GameLoop';
import { MovementSystem } from './game/systems/MovementSystem';
import { DisconnectCheckSystem } from './game/systems/gamePadSystems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from './deviceOutput/render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from './deviceOutput/render/effects/PlayerReadyEffectRenderer';
import { WorldRenderer } from './deviceOutput/render/gameState/world/WorldRenderer';
import { ControllerTestBackgroundRenderer } from './deviceOutput/render/gameState/world/ControllerTestBackgroundRenderer';
import { ControllerTestPlayerRenderer } from './deviceOutput/render/gameState/world/ControllerTestPlayerRenderer';
import { StartMenuSoundPlayer } from './deviceOutput/soundPlayers/StartMenuSoundPlayer';
import { ControllersInjector } from './deviceInput/controllerInput/ControllersInjector';
import { BrowserGamepadProvider as FourPlayerGamepadProvider } from './deviceInput/controllerInput/controllerProviders/BrowserGamepadProvider';
import { WebHIDGamepadProvider as EightPlayerGamepadProvider } from './deviceInput/controllerInput/controllerProviders/WebHIDGamepadProvider/WebHIDGamepadProvider';
import { CombinedGamepadProvider } from './deviceInput/controllerInput/controllerProviders/CombinedGamepadProvider';
import { EventBus } from './game/events/EventBus';
import { StateInitializer } from './game/state/StateInitializer';
import { SetPreviousButtonsSystem } from './game/systems/gamePadSystems/SetPreviousButtonsSystem';
import { ReconnectControllerRenderer } from './deviceOutput/render/gameState/ui/ReconnectControllerRenderer';
import { StartMenuRenderer } from './deviceOutput/render/gameState/ui/StartMenuRenderer';
import { CanvasRenderAPI } from './deviceOutput/render/common/CanvasRenderAPI';
import { ControllerSystemInStartMenu } from './game/systems/startMenu/ControllerSystemInStartMenu';
import { AssignButtonsToPlayerSystem } from './game/systems/gamePadSystems/AssignButtonsToPlayerSystem';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const renderAPI = new CanvasRenderAPI(ctx);

function resizeCanvasToViewport() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvasToViewport();
window.addEventListener('resize', resizeCanvasToViewport);

const gameState = StateInitializer.createInitialGameState();

// EVENTS: Effects and sounds are triggered by events emitted during game update to the bus.
const eventBus = new EventBus();

// DEVICE INPUT: the input injectors read device input such as controllers and inject into gamestate
const inputInjectors = [
        new ControllersInjector(
            new CombinedGamepadProvider([ // Tries to use WebHID first (8 player support), falls back to browser API
                new EightPlayerGamepadProvider(), // Work in progress!
                new FourPlayerGamepadProvider(),
            ])
        ),
];

// GAMESTATE UPDATE SYSTEMS: systems update gamestate in series and emit events
const systems = [
    new ControllerSystemInStartMenu(),
    new AssignButtonsToPlayerSystem(),
    new DisconnectCheckSystem(),
    new MovementSystem(),
    new SetPreviousButtonsSystem(),
]

// DEVICE OUTPUT: Renderers, Effects, SoundPlayers
const gameStateRenderers = [
    new ReconnectControllerRenderer(renderAPI),
    new StartMenuRenderer(renderAPI),
    new ControllerTestBackgroundRenderer(renderAPI),
    new ControllerTestPlayerRenderer(renderAPI),
    new WorldRenderer(renderAPI),
];

// Effect renderers only take events from the bus as input, such as "player joined"
const effectRenderers = [
    new PlayerJoinedEffectRenderer(renderAPI),
    new PlayerReadyEffectRenderer(renderAPI),
];

// Sound players only take events from the bus as input
const soundPlayers = [
    new StartMenuSoundPlayer(),
];

// Game loop triggers each frame: input injection -> gamestate update ->gamestate rendering -> effect rendering -> sound playing 
const loop = new GameLoop(
    gameState, 
    eventBus, 
    inputInjectors, 
    systems, 
    gameStateRenderers, 
    effectRenderers, 
    soundPlayers);

loop.start();
