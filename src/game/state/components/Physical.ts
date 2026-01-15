import { Vector2 } from "../../../math/Vector2";
import { Positionable } from "./Positionable";

export type Rectangle = {
    type: 'rect';
    width: number;
    height: number;
}

export type Circle = {
    type: 'circle';
    radius: number;
}

export type Triangle = {
    type: 'triangle';
    base: number;
    height: number;
}

export type Polygon = {
    type: 'polygon';
    points: Vector2[]; // relative to 0,0
}

// Generic Shape
export type Shape = Rectangle | Circle | Triangle | Polygon;

export type Physical = Positionable & {
  shape: Shape;
  color: string;
};
