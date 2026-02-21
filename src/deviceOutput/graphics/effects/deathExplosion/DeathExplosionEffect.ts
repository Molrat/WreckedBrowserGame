import { Vector2 } from "@/math/Vector2";

export type DeathExplosionEffect = {
  position: Vector2;
  color: string;
  startTime: number;
  duration: number;
  particles: ExplosionParticle[];
};

export type ExplosionParticle = {
  angle: number;
  speed: number;
  size: number;
  rotationSpeed: number;
};
