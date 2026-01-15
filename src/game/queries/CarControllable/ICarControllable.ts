import { withCarControls } from "@/game/state/components/car/WithCarControls";
import { Vector2 } from "@/math/Vector2";

export interface ICarControllable extends withCarControls{
  velocity: Vector2;
};