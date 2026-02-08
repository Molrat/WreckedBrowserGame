import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";

export interface IDrivingPhysicsComputer{
  compute : (car: ICarState, deltaT: number) => Partial<ICarState>;
}
