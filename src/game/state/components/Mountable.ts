import { Vector2 } from "@/math/Vector2";

export type Mountable = {
  mountedOnPlayerId: string | null;
  relativePosition: Vector2;
  relativeOrientation: number;
};
