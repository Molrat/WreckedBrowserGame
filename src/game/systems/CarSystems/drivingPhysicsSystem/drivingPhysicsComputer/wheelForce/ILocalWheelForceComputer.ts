import { Vector2 } from "@/math/Vector2";
import { IWheelForceParams } from "./IWheelForceParams";

export interface ILocalWheelForceComputer {
  compute(params: IWheelForceParams): Vector2;
}
