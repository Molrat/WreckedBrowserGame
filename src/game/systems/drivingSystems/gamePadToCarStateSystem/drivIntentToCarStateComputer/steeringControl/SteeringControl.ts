import { ISteeringControl } from "./ISteeringControl";

export interface ISteeringControlConfig {
  steeringRate: number;     // rad/s
  centeringRate: number;    // rad/s
}

export class SteeringControl implements ISteeringControl {

  constructor(private config: ISteeringControlConfig) {}

  compute(
    intentValue: number,
    currentValue: number,
    deltaTime: number
  ): number {
    const delta = intentValue - currentValue;

    const rate =
      intentValue === 0
        ? this.config.centeringRate
        : this.config.steeringRate;

    const maxStep = rate * deltaTime;

    if (Math.abs(delta) <= maxStep) {
      return intentValue;
    }

    return currentValue + Math.sign(delta) * maxStep;
  }
}

