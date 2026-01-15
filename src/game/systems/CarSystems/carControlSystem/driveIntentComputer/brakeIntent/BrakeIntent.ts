import { Vector2, length } from "../../../../../../math/Vector2";
import { IBrakeIntent } from "./IBrakeIntent";
import { IBrakeIntentConfig } from "./IBrakeIntentConfig";

export class BrakeIntent implements IBrakeIntent {
  
  constructor(private config: IBrakeIntentConfig){}
  compute(inputValue: number, velocity: Vector2): number {
    // 1. Dead zone
    let x = inputValue <= this.config.deadZone
      ? 0
      : (inputValue - this.config.deadZone) / (1 - this.config.deadZone);

    // 2. Response curve (early bite)
    x = Math.pow(x, this.config.responseCurve);

    // 3. Reduce braking at very low speed (prevents jitter)
    const speed = length(velocity);
    if (speed < this.config.lowSpeedThreshold) {
      const t = speed / this.config.lowSpeedThreshold;
      x *= this.lerp(this.config.lowSpeedReduction, 1, t);
    }

    return Math.min(x, 1);
  }

  private lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }
}
