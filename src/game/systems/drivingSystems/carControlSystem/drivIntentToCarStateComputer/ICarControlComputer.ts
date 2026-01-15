import { IWithCarControls } from "@/game/systems/drivingSystems/carControlSystem/IWithCarControls";

export interface ICarControlComputer {
  compute: (current: IWithCarControls, intent: IWithCarControls, deltaT: number) => IWithCarControls;
}