import { IWithCarControls } from "@/game/systems/drivingSystems/carControlSystem/IWithCarControls";

import { IBrakeControl } from "./brakeControl/IBrakeControl";
import { IHandbrakeControl } from "./handbrakeControl/IHandbrakeControl";
import { ISteeringControl } from "./steeringControl/ISteeringControl";
import { IThrottleControl } from "./throttleControl/IThrottleControl";
import { ICarControlComputer } from "./ICarControlComputer";


export class CarControlComputer implements ICarControlComputer{

  constructor(
  private brakeControl: IBrakeControl, 
  private throttleControl: IThrottleControl,
  private handbrakeControl: IHandbrakeControl,
  private steeringControl: ISteeringControl) {}

  compute(current: IWithCarControls, intent: IWithCarControls, deltaT: number) : IWithCarControls{
    return {
      throttle: this.throttleControl.compute(intent.throttle, current.throttle, deltaT),
      brake: this.brakeControl.compute(intent.brake, current.brake, deltaT),
      handBrake: this.handbrakeControl.compute(intent.handBrake, current.handBrake, deltaT),
      wheelAngle: this.steeringControl.compute(intent.wheelAngle, current.wheelAngle, deltaT)
    };
  }
}