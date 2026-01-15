import { IWithCarControls } from "@/game/queries/WithCarControls/IWithCarControls";
import { IBrakeControlSystem } from "./brakeControl/IBrakeControlSystem";
import { IHandbrakeControlSystem } from "./handbrakeControl/IHandbrakeControlSystem";
import { ISteeringControlSystem } from "./steeringControl/ISteeringControlSystem";
import { IThrottleControlSystem } from "./throttleControl/IThrottleControlSystem";

export class DriveIntentionSystem{

  constructor(
  private brakeControlSystem: IBrakeControlSystem, 
  private throttleControlSystem: IThrottleControlSystem,
  private handbrakeControlSystem: IHandbrakeControlSystem,
  private steeringControlSystem: ISteeringControlSystem) {}

  update(controllableDrivables: IWithCarControls[], deltaT: number) : void{
    for (const entity of controllableDrivables) {
      entity.throttle = this.throttleControlSystem.update(entity.throttleIntent, entity.throttle, deltaT);
      entity.brake = this.brakeControlSystem.update(entity.brakeIntent, entity.brake, deltaT);
      entity.handBrake = this.handbrakeControlSystem.update(entity.handBrakeIntent, entity.handBrake, deltaT);
      entity.wheelAngle = this.steeringControlSystem.update(entity.wheelAngleIntent, entity.wheelAngle, deltaT);
    }
  }
}