import { isCarControllable } from "@/game/queries/CarControllable/isCarControllable";
import { EventBus } from "@/game/events/EventBus";
import { GameState } from "@/game/state/GameState";
import { ISystem } from "@/game/systems/ISystem";
import { IDriveIntentComputer } from "@/game/systems/CarSystems/carControlSystem/driveIntentComputer/IDriveIntentComputer";
import { ICarControlComputer } from "@/game/systems/CarSystems/carControlSystem/drivIntentToCarStateComputer/ICarControlComputer";

export class CarControlSystem implements ISystem {

    constructor(private driveIntentComputer: IDriveIntentComputer, private carControlComputer: ICarControlComputer){}
    update(state: GameState, eventBus: EventBus, deltaTime: number): void {
        if (state.ui.countdown !== null) return;
        const drivableEntities = state.entities.filter(isCarControllable);
        for (const car of drivableEntities) {
          const driveIntent = this.driveIntentComputer.compute(car);
          const carControlState = this.carControlComputer.compute(car, driveIntent, deltaTime);
          const frontWheelAngle = -(carControlState.steeringWheelAngle / car.maxSteeringWheelAngle * car.maxSteeringAngle);
          car.frontWheelAngle = frontWheelAngle;
          Object.assign(car, carControlState);
        }
    }
}