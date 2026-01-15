import { IThrottleIntentConfig } from "./ThrottleIntentConfig";
import { Vector2, length } from "../../../../../../math/Vector2";
import { IThrottleIntent } from "./IThrottleIntent";

export class ThrottleIntent implements IThrottleIntent {
  
  constructor(private config: IThrottleIntentConfig) {}
  compute( triggerValue: number, velocity: Vector2): number {
      // 1. Dead zone
    let x = triggerValue <= this.config.deadZone
      ? 0
      : (triggerValue - this.config.deadZone) / (1 - this.config.deadZone);

    // 2. Response curve
    x = Math.pow(x, this.config.responseCurve);

    // 3. High-speed throttle limiting
    const speed = length(velocity);
    const t = Math.min(speed / this.config.maxSpeed, 1);
    const speedLimit =
      1 - t * (1 - this.config.highSpeedLimit);

    return Math.min(x, speedLimit);
  }
}
