import { Vector2 } from "@/math/Vector2";

export type Textable = {
  text: string;
  textOffset: Vector2;  // offset from entity position
  textSize: number;     // font size in world units (meters)
  textColor: string;
  textDepth: number;    // rendering order: lower = drawn first (behind)
};
