import { IBrakeControl } from "./IBrakeControl";

export interface IBrakeControlConfig {
  applyRate: number;     // per second
  releaseRate: number;   // per second
}

export class BrakeControl
  implements IBrakeControl {

  constructor(private config: IBrakeControlConfig) {}

  compute(
    intentValue: number,
    currentValue: number,
    deltaTime: number
  ): number {
    const rate =
      intentValue > currentValue
        ? this.config.applyRate
        : this.config.releaseRate;

    const maxStep = rate * deltaTime;
    const delta = intentValue - currentValue;

    if (Math.abs(delta) <= maxStep) {
      return intentValue;
    }

    return currentValue + Math.sign(delta) * maxStep;
  }
}

