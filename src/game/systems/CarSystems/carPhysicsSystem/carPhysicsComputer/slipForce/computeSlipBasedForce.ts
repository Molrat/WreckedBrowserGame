import { shapeFunction, computeShapeMax } from "../tireShapeFunctions";
import { ITireForces } from "./ITireForces";

export interface ISlipForceParams {
  slipRatio: number;
  slipAngle: number;
  mu: number;
  normalForce: number;
  tireGripBuildUp: number;
  tireGripDropOff: number;
  tireGripBuildUpLatScalar: number;
  tireGripDropOffLatScalar: number;
  maxGripLatScalar: number;
}

/**
 * Computes tire forces from slip ratio and slip angle using S-curve model.
 */
export function computeSlipBasedForce(p: ISlipForceParams): ITireForces {
  const tireGripBuildUpLat = p.tireGripBuildUp * p.tireGripBuildUpLatScalar;
  const tireGripDropOffLat = p.tireGripDropOff * p.tireGripDropOffLatScalar;

  const sxMax = computeShapeMax(p.tireGripBuildUp, p.tireGripDropOff);
  const syMax = computeShapeMax(tireGripBuildUpLat, tireGripDropOffLat);

  const slipRatioAbs = Math.min(Math.abs(p.slipRatio), 1);
  const slipAngleAbs = Math.min(Math.abs(p.slipAngle), 1);

  const sxNorm = shapeFunction(slipRatioAbs, p.tireGripBuildUp, p.tireGripDropOff) / sxMax;
  const syNorm = shapeFunction(slipAngleAbs, tireGripBuildUpLat, tireGripDropOffLat) / syMax;

  const fxPeak = p.mu * p.normalForce;
  const fyPeak = p.mu * p.normalForce * p.maxGripLatScalar;

  return {
    longitudinalForce: Math.sign(p.slipRatio) * fxPeak * sxNorm,
    lateralForce: -Math.sign(p.slipAngle) * fyPeak * syNorm,
  };
}
