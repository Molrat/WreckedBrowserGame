import { ISystem } from '@/game/systems/ISystem';
import { GameState } from '@/game/state/GameState';
import { EventBus } from '@/game/events/EventBus';
import { isFrontWheel } from '@/game/queries/FrontWheel/isFrontWheel';
import { isWithCarPhysics } from '@/game/queries/WithCarPhysics/isWithCarPhysics';

export class FrontWheelSteeringSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, _dt: number): void {
    if (state.ui.openMenu !== null) return;

    const frontWheels = state.entities.filter(isFrontWheel);
    const cars = state.entities.filter(isWithCarPhysics);

    for (const wheel of frontWheels) {
      if (wheel.mountedOnPlayerId === null) continue;
      const car = cars.find(c => c.id === wheel.mountedOnPlayerId);
      if (!car) continue;
      wheel.relativeOrientation = car.frontWheelAngle;
    }
  }
}
