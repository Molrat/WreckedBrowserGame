import { add, scale, Vector2 } from "@/math/Vector2";
import { IWheelForceParams } from "./IWheelForceParams";
import { ILocalWheelForceComputer } from "./ILocalWheelForceComputer";

export class SimpleLocalWheelForceComputer implements ILocalWheelForceComputer {
  compute(params: IWheelForceParams): Vector2 {
    const relativeVelocity = add(params.velocityInWheelFrame, {
      x: 0,
      y: -params.wheelAngularSpeed * params.wheelRadius,
    });
    const normalizedLocalForce = this.localVelocityToNormalizedForce(
      relativeVelocity,
      params.longitudalStiffness
    );
    const scaledForce = scale(normalizedLocalForce, params.normalForce * params.mu);
    return scaledForce;
  }

  private localVelocityToNormalizedForce(vel: Vector2, stiffness: number): Vector2 {
    const k = stiffness;
    const raw: Vector2 = {
      x: -1 * k * (0.01 * vel.x),
      y: -1 * k * (0.01 * vel.y),
    };

    const mag = Math.hypot(raw.x, raw.y);
    if (mag > 1) {
      return { x: raw.x / (2 * mag), y: raw.y / (2 * mag) };
    }
    return raw;
  }
}
