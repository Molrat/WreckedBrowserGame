import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";

export interface ICarPhysicsComputer{
  compute : (car: ICarState, deltaT: number) => ICarState;
}
