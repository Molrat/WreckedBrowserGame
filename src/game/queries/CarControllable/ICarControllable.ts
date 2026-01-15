import { withCarControls } from "@/game/state/components/controllableCar/WithCarControls";
import { Vector2 } from "@/math/Vector2";

export interface ICarControllable extends withCarControls{
  velocity: Vector2;
};