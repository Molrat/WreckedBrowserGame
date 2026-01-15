import { IWithCarControls } from "@/game/systems/CarSystems/carControlSystem/IWithCarControls";

export interface ICarControlComputer {
  compute: (current: IWithCarControls, intent: IWithCarControls, deltaT: number) => IWithCarControls;
}