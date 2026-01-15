import { IControllable } from "@/game/queries/Controllable/IControllable";
import { IWithCarControls } from "@/game/systems/CarSystems/carControlSystem/IWithCarControls";
import { Vector2 } from "@/math/Vector2";

export interface IDriveIntentComputer {
  compute: (controllableDrivable: (IControllable & {velocity: Vector2})) => IWithCarControls;
}