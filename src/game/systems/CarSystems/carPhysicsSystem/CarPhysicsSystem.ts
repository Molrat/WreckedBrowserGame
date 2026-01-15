import { EventBus } from "@/game/events/EventBus";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import { ICarPhysicsComputer } from "./carPhysicsComputer/ICarPhysicsComputer";
import { ISystem } from "@/game/systems/ISystem";
import type { GameState } from "@/game/state/GameState";

export class CarPhysicsSystem implements ISystem{
  constructor(private physics: ICarPhysicsComputer){}

  update(state: GameState, eventBus: EventBus, dt: number)
  {
    const cars = state.entities.filter(isWithCarPhysics);
    cars.forEach(car => {
      const updatedCar = this.physics.compute(car, dt);
      car = { ...car, ...updatedCar}
    });
  };
}
