import { EventBus } from "../../../events/EventBus";
import { isControllableAndDrivable } from "../../../queries/Combined/isControllableAndDrivable";
import { GameState } from "../../../state/GameState";
import { ISystem } from "../../ISystem";
import { IDriveIntentComputer } from "./driveIntentComputer/IDriveIntentComputer";
import { ICarControlComputer } from "./drivIntentToCarStateComputer/ICarControlComputer";

export class CarControlSystem implements ISystem {

    constructor(private driveIntentSystem: IDriveIntentComputer, private carControlComputer: ICarControlComputer){}
    update(state: GameState, eventBus: EventBus, deltaTime: number): void {
      var drivableEntities = state.entities.filter(isControllableAndDrivable );
    
      drivableEntities.forEach(car => {
        const driveIntent = this.driveIntentSystem.compute(car);
        const carControlState = this.carControlComputer.compute(driveIntent, car, deltaTime);
        car = { ...car, ...carControlState };
      });
    }
}