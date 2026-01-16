import { GameLoop } from '@/game/loop/GameLoop';
import { MovementSystem } from '@/game/systems/MovementSystem';
import { DisconnectCheckSystem } from '@/game/systems/gamePadSystems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from '@/deviceOutput/render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from '@/deviceOutput/render/effects/PlayerReadyEffectRenderer';
import { WorldRenderer } from '@/deviceOutput/render/gameState/world/WorldRenderer';
import { ControllerTestBackgroundRenderer } from '@/deviceOutput/render/gameState/world/ControllerTestBackgroundRenderer';
import { ControllerTestPlayerRenderer } from '@/deviceOutput/render/gameState/world/ControllerTestPlayerRenderer';
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
import { CanvasRenderAPI } from '@/deviceOutput/render/common/CanvasRenderAPI';
import { AspectRatioInjector } from '@/deviceInput/windowInput/AspectRatioInjector';
import { CameraSystem } from '@/game/systems/CameraSystem';
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
    new AssignButtonsToPlayerSystem(),
    new DisconnectCheckSystem(),
    new CameraSystem(),
    carControlSystem,
    new CarPhysicsSystem(new CarPhysicsComputer),
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
    new SpeedometerRenderer(renderAPI),
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
