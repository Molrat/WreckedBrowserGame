import { GameLoop } from '@/game/loop/GameLoop';
import { MovementSystem } from '@/game/systems/MovementSystem';
import { DisconnectCheckSystem } from '@/game/systems/gamePadSystems/DisconnectCheckSystem';
import { PlayerJoinedEffectRenderer } from '@/deviceOutput/render/effects/PlayerJoinedEffectRenderer';
import { PlayerReadyEffectRenderer } from '@/deviceOutput/render/effects/PlayerReadyEffectRenderer';
import { PlayerDeathEffectRenderer } from '@/deviceOutput/render/effects/deathExplosion/PlayerDeathEffectRenderer';
import { WorldBackgroundRenderer } from '@/deviceOutput/render/gameState/world/WorldBackgroundRenderer';
import { DepthSortedRenderer } from '@/deviceOutput/render/gameState/world/DepthSortedRenderer';
import { AudioCache } from '@/deviceOutput/soundPlayers/eventBasedSounds/AudioCache';
import { StartMenuSoundPlayer } from '@/deviceOutput/soundPlayers/eventBasedSounds/StartMenuSoundPlayer';
import { WeaponSoundPlayer } from '@/deviceOutput/soundPlayers/eventBasedSounds/WeaponSoundPlayer';
import { GameplaySoundPlayer } from '@/deviceOutput/soundPlayers/eventBasedSounds/GameplaySoundPlayer';
import { CarSoundPlayer } from '@/deviceOutput/soundPlayers/eventBasedSounds/CarSoundPlayer';
import { ControllersInjector } from '@/deviceInput/controllerInput/ControllersInjector';
import { BrowserGamepadProvider as FourPlayerGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/BrowserGamepadProvider';
import { WebHIDGamepadProvider as EightPlayerGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/WebHIDGamepadProvider/WebHIDGamepadProvider';
import { CombinedGamepadProvider } from '@/deviceInput/controllerInput/controllerProviders/CombinedGamepadProvider';
import { EventBus } from '@/game/events/EventBus';
import { StateInitializer } from '@/game/state/StateInitializer';
import { SetPreviousButtonsSystem } from '@/game/systems/gamePadSystems/SetPreviousButtonsSystem';
import { ReconnectControllerRenderer } from '@/deviceOutput/render/gameState/ui/ReconnectControllerRenderer';
import { IntroRenderer } from '@/deviceOutput/render/gameState/ui/IntroRenderer';
import { StartMenuRenderer } from '@/deviceOutput/render/gameState/ui/StartMenuRenderer';
import { CameraRenderAPI } from '@/deviceOutput/render/common/CameraRenderAPI';
import { ScreenRenderAPI } from '@/deviceOutput/render/common/ScreenRenderAPI';
import { AspectRatioInjector } from '@/deviceInput/windowInput/AspectRatioInjector';
import { CameraSystem } from '@/game/systems/CameraSystem';
import { CAMERA_CONSTANTS } from '@/deviceOutput/config/cameraConstants';
import { StartMenuSystem } from '@/game/systems/menuSystems/StartMenuSystem';
import { AssignButtonsToPlayerSystem } from '@/game/systems/gamePadSystems/AssignButtonsToPlayerSystem';
import { CarControlSystem } from '@/game/systems/CarSystems/carControlSystem/CarControlSystem';
import { DriveIntentComputer } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/DriveIntentComputer';
import { CarControlComputer } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/CarControlComputer';
import { HandBrakeIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/handbrakeIntent/HandBrakeIntent';
import { BrakeIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/brakeIntent/BrakeIntent';
import { ThrottleIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/throttleIntent/ThrottleIntent';
import { SteeringIntent } from '@/game/systems/CarSystems/carControlSystem/driveIntentComputer/steeringIntent/SteeringIntent';
import { BRAKE_CONTROL, BRAKE_INTENT, HANDBRAKE_CONTROL, HANDBRAKE_INTENT, STEERING_CONTROL, STEERING_INTENT, THROTTLE_CONTROL, THROTTLE_INTENT } from "./game/config/carSteeringConstants";
import { SteeringControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/steeringControl/SteeringControl';
import { ThrottleControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/throttleControl/ThrottleControl';
import { HandbrakeControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/handbrakeControl/HandBrakeControl';
import { BrakeControl } from '@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/brakeControl/BrakeControl';
import { DrivingPhysicsSystem } from './game/systems/CarSystems/drivingPhysicsSystem/DrivingPhysicsSystem';
import { DrivingPhysicsComputer } from './game/systems/CarSystems/drivingPhysicsSystem/drivingPhysicsComputer/DrivingPhysicsComputer';
import { SimpleLocalWheelForceComputer } from './game/systems/CarSystems/drivingPhysicsSystem/drivingPhysicsComputer/wheelForce/SimpleLocalWheelForceComputer';
import { PlatformProgressionSystem } from './game/systems/platformSystems/PlatformProgressionSystem';
import { OffPlatformDamageSystem } from './game/systems/platformSystems/OffPlatformDamageSystem';
import { PlayerDeathSystem } from './game/systems/roundSystems/PlayerDeathSystem';
import { RoundStartSystem } from './game/systems/roundSystems/RoundStartSystem';
import { IntroMenuSystem } from './game/systems/menuSystems/IntroMenuSystem';
import { InbetweenLevelsMenuSystem } from './game/systems/menuSystems/InbetweenLevelsMenuSystem';
import { EndOfGameMenuSystem } from './game/systems/menuSystems/EndOfGameMenuSystem';
import { InbetweenLevelsMenuRenderer } from './deviceOutput/render/gameState/ui/InbetweenLevelsMenuRenderer';
import { EndOfGameMenuRenderer } from './deviceOutput/render/gameState/ui/EndOfGameMenuRenderer';
import { PacejkaWheelForceComputer } from './game/systems/CarSystems/drivingPhysicsSystem/drivingPhysicsComputer/wheelForce/PacejkaWheelForceComputer';
import { PACEJKA_LONGITUDINAL, PACEJKA_LATERAL, COLLISION_CONFIG } from '@/game/config/carPhysicsConstants';
import { SimpleCarCollisionComputer } from './game/systems/CarSystems/carCollisionSystem/simpleCollisionComputer/SimpleCarCollisionComputer';
import { CarCollisionSystem } from './game/systems/CarSystems/carCollisionSystem/CarCollisionSystem';
import { WeaponSpawnSystem } from './game/systems/WeaponSystems/WeaponSpawnSystem/WeaponSpawnSystem';
import { WeaponPickupSystem } from './game/systems/WeaponSystems/WeaponPickupSystem';
import { WeaponMountSyncSystem } from './game/systems/WeaponSystems/WeaponMountSyncSystem';
import { AmmoBasedFireSystem } from './game/systems/WeaponSystems/AmmoBasedFireSystem/AmmoBasedFireSystem';
import { ProjectileFactory } from './game/state/entities/Factories/ProjectileFactories/ProjectileFactory';
import { LifeSpanSystem } from './game/systems/LifeSpanSystem';
import { DamagingCollisionSystem } from './game/systems/WeaponSystems/DamagingCollisionSystem';
import { HomingMissileSystem } from './game/systems/WeaponSystems/HomingMissileSystem';
import { WeaponFireEffectRenderer } from './deviceOutput/render/effects/weaponFire/WeaponFireEffectRenderer';
import { FrontWheelEntitySteeringSystem } from './game/systems/CarSystems/FrontWheelEntitySteeringSystem';
import { CountdownSystem } from './game/systems/roundSystems/CountdownSystem';
import { CountdownRenderer } from './deviceOutput/render/gameState/ui/CountdownRenderer';
import { CarControlSoundPlayer } from './deviceOutput/soundPlayers/continuousSounds/CarControlSoundPlayer';
import { IContinuousSoundPlayer } from './deviceOutput/soundPlayers/continuousSounds/IContinuousSoundPlayer';

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
const pacejkaModel = new PacejkaWheelForceComputer(PACEJKA_LONGITUDINAL, PACEJKA_LATERAL);
const simpleModel = new SimpleLocalWheelForceComputer();
const carCollisionComputer = new SimpleCarCollisionComputer(COLLISION_CONFIG);
const systems = [
    new IntroMenuSystem(),
    new StartMenuSystem(),
    new InbetweenLevelsMenuSystem(),
    new EndOfGameMenuSystem(),
    new AssignButtonsToPlayerSystem(),
    new DisconnectCheckSystem(),
    new RoundStartSystem(),
    new CountdownSystem(),
    new CameraSystem(CAMERA_CONSTANTS),
    carControlSystem,
    new FrontWheelEntitySteeringSystem(),
    new DrivingPhysicsSystem(new DrivingPhysicsComputer(pacejkaModel)),
    new CarCollisionSystem(carCollisionComputer),
    new MovementSystem(),
    new WeaponSpawnSystem(),
    new WeaponPickupSystem(),
    new WeaponMountSyncSystem(),
    new AmmoBasedFireSystem(new ProjectileFactory()),
    new HomingMissileSystem(),
    new LifeSpanSystem(),
    new DamagingCollisionSystem(),
    new PlatformProgressionSystem(),
    new OffPlatformDamageSystem(),
    new PlayerDeathSystem(),
    new SetPreviousButtonsSystem(),
]

// DEVICE OUTPUT: Renderers, Effects, SoundPlayers
// DepthSortedRenderer handles both polygons and text, sorted by depth
const gameStateRenderers = [
    new WorldBackgroundRenderer(),
    new DepthSortedRenderer(),  // platforms (0) → platform text (1) → players (2) → tires (3)
    //new WheelForcesRenderer(),
];

// Screen renderers render in pixel coordinates (no camera projection)
const screenRenderers = [
    new IntroRenderer(),
    new ReconnectControllerRenderer(),
    new StartMenuRenderer(),
    new InbetweenLevelsMenuRenderer(),
    new EndOfGameMenuRenderer(),
    new CountdownRenderer(),
];

// Effect renderers only take events from the bus as input, such as "player joined"
const effectRenderers = [
    new PlayerJoinedEffectRenderer(screenRenderAPI),
    new PlayerReadyEffectRenderer(screenRenderAPI),
    new PlayerDeathEffectRenderer(cameraRenderAPI),
    new WeaponFireEffectRenderer(cameraRenderAPI),
];

// Sound players only take events from the bus as input
const audioCache = new AudioCache();
const soundPlayers = [
    new StartMenuSoundPlayer(audioCache),
    new WeaponSoundPlayer(audioCache),
    new GameplaySoundPlayer(audioCache),
    //new CarSoundPlayer(audioCache),
];
// Continuous sound players
const continuousSoundPlayers: IContinuousSoundPlayer[] = [
    //new CarControlSoundPlayer(audioCache),
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
    soundPlayers,
    continuousSoundPlayers);

loop.start();
