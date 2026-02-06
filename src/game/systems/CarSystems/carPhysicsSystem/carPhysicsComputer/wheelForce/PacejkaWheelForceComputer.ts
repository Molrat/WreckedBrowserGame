import { Vector2 } from "@/math/Vector2";
import { IWheelForceParams } from "./IWheelForceParams";
import { ILocalWheelForceComputer } from "./ILocalWheelForceComputer";
import { PacejkaCoefficients } from "./PacejkaCoefficients";
import { clamp } from "@/math/numberFunctions";

export class PacejkaWheelForceComputer implements ILocalWheelForceComputer {
  constructor(
    private readonly longCoeffs: PacejkaCoefficients,
    private readonly latCoeffs: PacejkaCoefficients
  ) {}

  compute(params: IWheelForceParams): Vector2 {
    const { slipRatio, slipAngle } = this.computeSlip(params);
    const speed = Math.abs(params.velocityInWheelFrame.y);
    const speedFactor = clamp(1.0 - speed / 80, 0.6, 1.0);
    const effectiveB = this.longCoeffs.B * speedFactor;
    const longCoeffsWithDynamicB = { ...this.longCoeffs, B: effectiveB };
    const fLongRaw = this.pacejkaFormula(slipRatio, longCoeffsWithDynamicB, params.mu, params.normalForce);
    const fLatRaw = this.pacejkaFormula(slipAngle, this.latCoeffs, params.mu, params.normalForce);
    return this.applyFrictionCircle(fLongRaw, fLatRaw, params.mu, params.normalForce);
  }

  private computeSlip(params: IWheelForceParams): { slipRatio: number; slipAngle: number } {
    const vLong = params.velocityInWheelFrame.y;
    const vLat = params.velocityInWheelFrame.x;
    const wheelSpeed = params.wheelAngularSpeed * params.wheelRadius;

    const epsilon = 0.1;
    const denom = Math.max(Math.abs(vLong), Math.abs(wheelSpeed), epsilon);
    const slipRatio = clamp((wheelSpeed - vLong) / denom, -3, 3);
    const slipAngle = Math.atan2(-vLat, Math.abs(vLong) + epsilon);

    return { slipRatio, slipAngle };
  }

  private pacejkaFormula(slip: number, c: PacejkaCoefficients, mu: number, normalForce: number): number {
    const Bx = c.B * slip;
    const inner = Bx - c.E * (Bx - Math.atan(Bx));
    return mu * normalForce * Math.sin(c.C * Math.atan(inner));
  }

  private applyFrictionCircle(fLong: number, fLat: number, mu: number, normalForce: number): Vector2 {
    const fMag = Math.hypot(fLong, fLat);
    const fMax = mu * normalForce;
    const rescalar = fMag > fMax ? fMax / fMag : 1;
    return { x: fLat * rescalar, y: fLong * rescalar };
  }
}
