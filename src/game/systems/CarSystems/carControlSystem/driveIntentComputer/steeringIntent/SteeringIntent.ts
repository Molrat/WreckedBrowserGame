import { Vector2, length } from "../../../../../../math/Vector2";
import { ISteeringIntent } from "./ISteeringIntent";
import { ISteeringIntentConfig } from "./IsteeringIntentConfig";

export class SteeringIntent implements ISteeringIntent {
  
  constructor(private config: ISteeringIntentConfig) {}

  compute(inputValue: number, velocity: Vector2): number {
    // 1. Dead zone
    let x = this.applyDeadZone(inputValue, this.config.deadZone);

    // 2. Response curve (precision near center)
    x = this.applyResponseCurve(x, this.config.responseCurve);

    // 3. Speed-based steering limit
    const speed = length(velocity);
    const t = Math.min(Math.abs(speed) / this.config.highSpeedThreshold, 1);

    const maxSteeringAngle = this.lerp(
      this.config.maxSteeringAngleLowSpeed,
      this.config.maxSteeringAngleHighSpeed,
      t
    );

    // 4. Intent output
    return x * maxSteeringAngle;
  }
  private applyDeadZone(value: number, deadZone: number): number {
    const abs = Math.abs(value);
    if (abs <= deadZone) return 0;
    return Math.sign(value) * (abs - deadZone) / (1 - deadZone);
  }

  private applyResponseCurve(value: number, exponent: number): number {
    return Math.sign(value) * Math.pow(Math.abs(value), exponent);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }
}
