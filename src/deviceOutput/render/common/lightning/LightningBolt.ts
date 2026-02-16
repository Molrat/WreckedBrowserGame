import type { Vector2 } from "@/math/Vector2";

export type LightningSegment = {
  points: Vector2[];
  width: number;
};

export type LightningBolt = {
  segments: LightningSegment[];
  alpha: number;
  createdAt: number;
  lifetime: number;
  flashIntensity: number;
};
