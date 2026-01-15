import { Vector2 } from "../../../math/Vector2";

export interface IAcceleratable {
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2;
    orientation: number; // radians
}