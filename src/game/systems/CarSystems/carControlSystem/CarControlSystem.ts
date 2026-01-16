import { isCarControllable } from "@/game/queries/CarControllable/isCarControllable";
import { EventBus } from "@/game/events/EventBus";
import { GameState } from "@/game/state/GameState";
import { ISystem } from "@/game/systems/ISystem";
import { IDriveIntentComputer } from "@/game/systems/CarSystems/carControlSystem/driveIntentComputer/IDriveIntentComputer";
import { ICarControlComputer } from "@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/ICarControlComputer";

export class CarControlSystem implements ISystem {

    constructor(private driveIntentSystem: IDriveIntentComputer, private carControlComputer: ICarControlComputer){}
    update(state: GameState, eventBus: EventBus, deltaTime: number): void {
        const drivableEntities = state.entities.filter(isCarControllable);
        for (const car of drivableEntities) {
          const driveIntent = this.driveIntentSystem.compute(car);
          const carControlState = this.carControlComputer.compute(car, driveIntent, deltaTime);
          Object.assign(car, carControlState);
        }
    }
}