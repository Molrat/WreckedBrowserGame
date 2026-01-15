import { Vector2 } from "@/math/Vector2";

import { IControllable } from "@/game/queries/Controllable/IControllable";
import { IWithCarControls } from "@/game/systems/drivingSystems/carControlSystem/IWithCarControls";
import { IDriveIntentComputer } from "./IDriveIntentComputer";
import { IBrakeIntent } from "./brakeIntent/IBrakeIntent";
import { IThrottleIntent } from "./throttleIntent/IThrottleIntent";
import { IHandbrakeIntent } from "./handbrakeIntent/IHandbrakeIntent";
import { ISteeringIntent } from "./steeringIntent/ISteeringIntent";


export class DriveIntentComputer implements IDriveIntentComputer{

  constructor(
  private brakeIntentComputer: IBrakeIntent, 
  private throttleIntentComputer: IThrottleIntent,
  private handbrakeIntentComputer: IHandbrakeIntent,
  private steeringIntentComputer: ISteeringIntent) {}

  compute(controllableDrivable: (IControllable & {velocity: Vector2})) : IWithCarControls{
    return {
      throttle: this.throttleIntentComputer.compute(controllableDrivable.currentGamepad.rightTrigger, controllableDrivable.velocity),
      brake: this.brakeIntentComputer.compute(controllableDrivable.currentGamepad.leftTrigger, controllableDrivable.velocity),
      handBrake: this.handbrakeIntentComputer.compute(controllableDrivable.currentGamepad.cross ? 1 : 0, controllableDrivable.velocity),
      wheelAngle: this.steeringIntentComputer.compute(controllableDrivable.currentGamepad.leftStick.x, controllableDrivable.velocity)
    }
  }
}
