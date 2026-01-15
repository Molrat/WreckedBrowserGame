import { IWithCarControls } from "@/game/queries/WithCarControls/IWithCarControls";

export interface ICarControlComputer {
  compute: (current: IWithCarControls, intent: IWithCarControls, deltaT: number) => IWithCarControls;
}