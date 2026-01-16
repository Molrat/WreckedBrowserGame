import { Vector2 } from "@/math/Vector2";
import { ISteeringIntent } from "./ISteeringIntent";
import { ISteeringIntentConfig } from "./IsteeringIntentConfig";

export class SteeringIntent implements ISteeringIntent {
  
  constructor(private config: ISteeringIntentConfig) {}

  compute(inputValue: number, _velocity: Vector2): number {
    // 1. Dead zone
    let x = this.applyDeadZone(inputValue, this.config.deadZone);
    // 2. Response curve (precision near center)
    x = this.applyResponseCurve(x, this.config.responseCurve);
    // 3. Fixed wheel angle range (no speed limit)
    return x * this.config.maxSteeringWheelAngle;
  }
  private applyDeadZone(value: number, deadZone: number): number {
    const abs = Math.abs(value);
    if (abs <= deadZone) return 0;
    return Math.sign(value) * (abs - deadZone) / (1 - deadZone);
  }

  private applyResponseCurve(value: number, exponent: number): number {
    return Math.sign(value) * Math.pow(Math.abs(value), exponent);
  }

  // no lerp: fixed wheel angle range
}
