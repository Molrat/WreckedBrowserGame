import { ExplosionParticle } from "./DeathExplosionEffect";

export function createExplosionParticles(count: number): ExplosionParticle[] {
  const particles: ExplosionParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5,
      speed: 4 + Math.random() * 14, // varied speeds for organic feel
      size: 0.4 + Math.random() * 0.8, // meters - triangle size
      rotationSpeed: (Math.random() - 0.5) * 8,
    });
  }
  return particles;
}
