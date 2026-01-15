import { IHandbrakeControl } from "./IHandbrakeControl";

export interface IHandbrakeControlConfig {
  engageRate: number;    // per second
  releaseRate: number;   // per second
}


export class HandbrakeControl
  implements IHandbrakeControl {

  constructor(private config: IHandbrakeControlConfig) {}

  compute(
    intentValue: number,
    currentValue: number,
    deltaTime: number
  ): number {
    const rate =
      intentValue > currentValue
        ? this.config.engageRate
        : this.config.releaseRate;

    const maxStep = rate * deltaTime;
    const delta = intentValue - currentValue;

    if (Math.abs(delta) <= maxStep) {
      return intentValue;
    }

    return currentValue + Math.sign(delta) * maxStep;
  }
}

