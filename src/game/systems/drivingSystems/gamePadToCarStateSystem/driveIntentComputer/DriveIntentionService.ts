import { Vector2 } from "@/math/Vector2";
import { IBrakeIntentService } from "./brakeIntent/IBrakeIntentService";
import { IHandbrakeIntentService } from "./handbrakeIntent/IHandbrakeIntentService";
import { ISteeringIntentService } from "./steeringIntent/ISteeringIntentService";
import { IThrottleIntentService } from "./throttleIntent/IThrottleIntentService";
import { IControllable } from "@/game/queries/Controllable/IControllable";
import { IWithCarControls } from "@/game/queries/WithCarControls/IWithCarControls";
import { IDriveIntentionService } from "./IDriveIntentionService";

export class DriveIntentionService implements IDriveIntentionService{

  constructor(
  private brakeIntentComputer: IBrakeIntentService, 
  private throttleIntentComputer: IThrottleIntentService,
  private handbrakeIntentComputer: IHandbrakeIntentService,
  private steeringIntentComputer: ISteeringIntentService) {}

  update(controllableDrivables: (IControllable & {velocity: Vector2})[]) : IWithCarControls[]{
    return controllableDrivables.map(e=>
    {
      return {
        throttle: this.throttleIntentComputer.compute(e.currentGamepad.rightTrigger, e.velocity),
        brake: this.brakeIntentComputer.compute(e.currentGamepad.leftTrigger, e.velocity),
        handBrake: this.handbrakeIntentComputer.compute(e.currentGamepad.cross ? 1 : 0, e.velocity),
        wheelAngle: this.steeringIntentComputer.compute(e.currentGamepad.leftStick.x, e.velocity)
      }
    }
  }
}