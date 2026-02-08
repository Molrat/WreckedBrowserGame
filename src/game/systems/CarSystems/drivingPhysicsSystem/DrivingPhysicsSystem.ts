import { EventBus } from "@/game/events/EventBus";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import { IDrivingPhysicsComputer } from "./drivingPhysicsComputer/IDrivingPhysicsComputer";
import { ISystem } from "@/game/systems/ISystem";
import type { GameState } from "@/game/state/GameState";

export class DrivingPhysicsSystem implements ISystem{
  constructor(private physics: IDrivingPhysicsComputer){}

  update(state: GameState, eventBus: EventBus, dt: number)
  {
    const cars = state.entities.filter(isWithCarPhysics);
    cars.forEach(car => {
      const updatedCar = this.physics.compute(car, dt);
      Object.assign(car, updatedCar);
    });
  };
}
