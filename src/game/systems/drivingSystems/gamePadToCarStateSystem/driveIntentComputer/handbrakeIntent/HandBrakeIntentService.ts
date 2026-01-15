import { IHandbrakeIntentConfig } from "./IHandbrakeIntentConfig";
import { Vector2 } from "@/math/Vector2";
import { IHandbrakeIntentService } from "./IHandbrakeIntentService";

export class HandBrakeIntentService implements IHandbrakeIntentService {

  constructor(private config: IHandbrakeIntentConfig) {}

  compute( inputValue: number, velocity: Vector2): number {
    let x = inputValue <= this.config.deadZone
      ? 0
      : (inputValue - this.config.deadZone) / (1 - this.config.deadZone);

    return Math.pow(x, this.config.responseCurve);
  }
}