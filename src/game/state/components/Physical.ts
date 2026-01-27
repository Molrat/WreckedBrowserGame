import { Vector2 } from "../../../math/Vector2";
import { Positionable } from "./Positionable";

// Generic Shape

export type Physical = Positionable & {
  shape: Vector2[];
  fillColor: string | null;
  borderColor: string | null;
  borderWidth: number | null;
};
