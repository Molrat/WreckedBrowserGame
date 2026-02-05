import { GameLoop } from '@/game/loop/GameLoop';
import { MovementSystem } from '@/game/systems/MovementSystem';
import { DisconnectCheckSystem } from '@/game/systems/gamePadSystems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from '@/deviceOutput/render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from '@/deviceOutput/render/effects/PlayerReadyEffectRenderer';
import { ControllerTestBackgroundRenderer } from '@/deviceOutput/render/gameState/world/ControllerTestBackgroundRenderer';
import { RandomTrackRenderer } from '@/deviceOutput/render/gameState/world/RandomTrackRenderer';
import { WheelForcesRenderer } from '@/deviceOutput/render/gameState/world/WheelForcesRenderer';
import { TireRenderer } from '@/deviceOutput/render/gameState/world/TireRenderer';
import { DepthSortedRenderer } from '@/deviceOutput/render/gameState/world/DepthSortedRenderer';
import { StartMenuSoundPlayer } from '@/deviceOutput/soundPlayers/StartMenuSoundPlayer';
import { ControllersInjector } from '@/deviceInput/controllerInput/ControllersInjector';
import { BrowserGamepadProvider as FourPlayerGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/BrowserGamepadProvider';
import { WebHIDGamepadProvider as EightPlayerGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/WebHIDGamepadProvider/WebHIDGamepadProvider';
import { CombinedGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/CombinedGamepadProvider';
import { EventBus } from '@/game/events/EventBus';
import { StateInitializer } from '@/game/state/StateInitializer';
import { SetPreviousButtonsSystem } from '@/game/systems/gamePadSystems/SetPreviousButtonsSystem';
import { ReconnectControllerRenderer } from '@/deviceOutput/render/gameState/ui/ReconnectControllerRenderer';
import { StartMenuRenderer } from '@/deviceOutput/render/gameState/ui/StartMenuRenderer';
import { SpeedometerRenderer } from '@/deviceOutput/render/gameState/ui/SpeedometerRenderer';
import { CameraRenderAPI } from '@/deviceOutput/render/common/CameraRenderAPI';
import { ScreenRenderAPI } from '@/deviceOutput/render/common/ScreenRenderAPI';
import { AspectRatioInjector } from '@/deviceInput/windowInput/AspectRatioInjector';
import { CameraSystem } from '@/game/systems/CameraSystem';
import { CAMERA_CONSTANTS } from '@/deviceOutput/render/constants';
import { ControllerSystemInStartMenu } from '@/game/systems/startMenu/ControllerSystemInStartMenu';
import { AssignButtonsToPlayerSystem } from '@/game/systems/gamePadSystems/AssignButtonsToPlayerSystem';
import { CarControlSystem } from '@/game/systems/CarSystems/carControlSystem/CarControlSystem';
import { DriveIntentComputer } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/DriveIntentComputer';
import { CarControlComputer } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/CarControlComputer';
import { HandBrakeIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/handbrakeIntent/HandBrakeIntent';
import { BrakeIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/brakeIntent/BrakeIntent';
import { ThrottleIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/throttleIntent/ThrottleIntent';
import { SteeringIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/steeringIntent/SteeringIntent';
import { BRAKE_CONTROL, BRAKE_INTENT, HANDBRAKE_CONTROL, HANDBRAKE_INTENT, STEERING_CONTROL, STEERING_INTENT, THROTTLE_CONTROL, THROTTLE_INTENT } from '@/game/config/constants';
import { SteeringControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/steeringControl/SteeringControl';
import { ThrottleControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/throttleControl/ThrottleControl';
import { HandbrakeControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/handbrakeControl/HandBrakeControl';
import { BrakeControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/brakeControl/BrakeControl';
import { CarPhysicsSystem } from './game/systems/CarSystems/carPhysicsSystem/CarPhysicsSystem';
import { CarPhysicsComputer } from './game/systems/CarSystems/carPhysicsSystem/carPhysicsComputer/CarPhysicsComputer';
import { SimpleLocalWheelForceComputer } from './game/systems/CarSystems/carPhysicsSystem/carPhysicsComputer/wheelForce/SimpleLocalWheelForceComputer';
import { PlatformProgressionSystem } from './game/systems/platformSystems/PlatformProgressionSystem';
import { OffPlatformDamageSystem } from './game/systems/platformSystems/OffPlatformDamageSystem';
import { PlayerDeathSystem } from './game/systems/roundSystems/PlayerDeathSystem';
import { RoundStartSystem } from './game/systems/roundSystems/RoundStartSystem';
import { InbetweenLevelsMenuSystem } from './game/systems/menuSystems/InbetweenLevelsMenuSystem';
import { EndOfGameMenuSystem } from './game/systems/menuSystems/EndOfGameMenuSystem';
import { InbetweenLevelsMenuRenderer } from './deviceOutput/render/gameState/ui/InbetweenLevelsMenuRenderer';
import { EndOfGameMenuRenderer } from './deviceOutput/render/gameState/ui/EndOfGameMenuRenderer';

const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const cameraRenderAPI = new CameraRenderAPI(ctx);
const screenRenderAPI = new ScreenRenderAPI(ctx);

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
        new AspectRatioInjector(),
];

const carControlSystem = new CarControlSystem(
    new DriveIntentComputer(
        new BrakeIntent(BRAKE_INTENT), 
        new ThrottleIntent(THROTTLE_INTENT),
        new HandBrakeIntent(HANDBRAKE_INTENT),
        new SteeringIntent(STEERING_INTENT)),
    new CarControlComputer(
        new BrakeControl(BRAKE_CONTROL),
        new ThrottleControl(THROTTLE_CONTROL),
        new HandbrakeControl(HANDBRAKE_CONTROL),
        new SteeringControl(STEERING_CONTROL)
    )
);

// GAMESTATE UPDATE SYSTEMS: systems update gamestate in series and emit events
const systems = [
    new ControllerSystemInStartMenu(),
    new InbetweenLevelsMenuSystem(),
    new EndOfGameMenuSystem(),
    new AssignButtonsToPlayerSystem(),
    new DisconnectCheckSystem(),
    new RoundStartSystem(),
    new CameraSystem(CAMERA_CONSTANTS.cameraMarginMeters),
    carControlSystem,
    new CarPhysicsSystem(new CarPhysicsComputer(new SimpleLocalWheelForceComputer())),
    new MovementSystem(),
    new PlatformProgressionSystem(),
    new OffPlatformDamageSystem(),
    new PlayerDeathSystem(),

    new SetPreviousButtonsSystem(),
]

// DEVICE OUTPUT: Renderers, Effects, SoundPlayers
// DepthSortedRenderer handles both polygons and text, sorted by depth
const gameStateRenderers = [
    new ControllerTestBackgroundRenderer(),
    new RandomTrackRenderer(),
    new DepthSortedRenderer(),  // platforms (0) → platform text (1) → players (2)
    new TireRenderer(),         // tires on top (depth 3)
    new WheelForcesRenderer(),
];

// Screen renderers render in pixel coordinates (no camera projection)
const screenRenderers = [
    new ReconnectControllerRenderer(),
    new StartMenuRenderer(),
    new InbetweenLevelsMenuRenderer(),
    new EndOfGameMenuRenderer(),
    new SpeedometerRenderer(),
];

// Effect renderers only take events from the bus as input, such as "player joined"
const effectRenderers = [
    new PlayerJoinedEffectRenderer(),
    new PlayerReadyEffectRenderer(),
];

// Sound players only take events from the bus as input
const soundPlayers = [
    new StartMenuSoundPlayer(),
];

// Game loop triggers each frame: input injection -> gamestate update ->gamestate rendering -> effect rendering -> sound playing 
const loop = new GameLoop(
    cameraRenderAPI,
    screenRenderAPI,
    gameState, 
    eventBus, 
    inputInjectors, 
    systems, 
    gameStateRenderers,
    screenRenderers, 
    effectRenderers, 
    soundPlayers);

loop.start();
