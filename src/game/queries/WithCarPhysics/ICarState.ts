import { WithCarState } from "@/game/state/components/car/WithCarState";
import { Movable } from "@/game/state/components/Movable";

export interface ICarState extends WithCarState, Movable {}