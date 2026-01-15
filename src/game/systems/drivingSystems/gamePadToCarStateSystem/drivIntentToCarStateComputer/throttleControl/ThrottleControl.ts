import { IThrottleControl } from "./IThrottleControl";

export interface IThrottleControlConfig {
  rampUpRate: number;     // per second
  rampDownRate: number;   // per second
}

export class ThrottleControl
  implements IThrottleControl {

  constructor(private config: IThrottleControlConfig) {}

  compute(
    intentValue: number,
    currentValue: number,
    deltaTime: number
  ): number {
    const rate =
      intentValue > currentValue
        ? this.config.rampUpRate
        : this.config.rampDownRate;

    const maxStep = rate * deltaTime;
    const delta = intentValue - currentValue;

    if (Math.abs(delta) <= maxStep) {
      return intentValue;
    }

    return currentValue + Math.sign(delta) * maxStep;
  }
}

