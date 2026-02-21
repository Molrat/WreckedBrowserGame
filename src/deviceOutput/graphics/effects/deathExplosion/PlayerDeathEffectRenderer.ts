import { GameEvent } from "@/game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "../IEffectRenderer";
import { DeathExplosionEffect } from "./DeathExplosionEffect";
import { createExplosionParticles } from "./createExplosionParticles";
import { ICameraRenderAPI } from "../../common/ICameraRenderAPI";

export class PlayerDeathEffectRenderer implements IEffectRenderer {
  private effects: DeathExplosionEffect[] = [];

  constructor(private draw: ICameraRenderAPI) {}

  render(events: GameEvent[]): void {
    const draw = this.draw;
    const now = performance.now();
    this.ingestEvents(events, now);
    this.renderEffects(draw, now);
    this.pruneExpiredEffects(now);
  }

  private ingestEvents(events: GameEvent[], now: number): void {
    for (const ev of events) {
      if (ev.type === 'PlayerDied') {
        this.effects.push({
          position: ev.position,
          color: ev.color,
          startTime: now,
          duration: 1400,
          particles: createExplosionParticles(24),
        });
      }
    }
  }

  private renderEffects(draw: ICameraRenderAPI, now: number): void {
    for (const fx of this.effects) {
      const t = (now - fx.startTime) / fx.duration;
      if (t >= 1) continue;
      this.renderExplosion(draw, fx, t);
    }
  }

  private renderExplosion(draw: ICameraRenderAPI, fx: DeathExplosionEffect, t: number): void {
    const easeOut = 1 - Math.pow(1 - t, 3); // cubic ease-out for smooth deceleration
    const alpha = Math.pow(1 - t, 2); // quadratic fade for slower disappearance
    const scale = 1 + easeOut * 1.5;

    for (const particle of fx.particles) {
      const distance = particle.speed * easeOut * scale;
      const x = fx.position.x + Math.cos(particle.angle) * distance;
      const y = fx.position.y + Math.sin(particle.angle) * distance;
      const rotation = particle.rotationSpeed * t * fx.duration / 1000;
      const size = particle.size * (1 - easeOut * 0.4);

      const shape = this.createTriangleShape(size);
      draw.drawPolygon({
        shape,
        position: { x, y },
        orientation: rotation,
        fillColor: this.withAlpha(fx.color, alpha),
        borderColor: this.withAlpha('#ffffff', alpha * 0.5),
        borderWidth: 2,
        depth: 100,
      });
    }
  }

  private createTriangleShape(size: number): { x: number; y: number }[] {
    return [
      { x: 0, y: -size },
      { x: size * 0.866, y: size * 0.5 },
      { x: -size * 0.866, y: size * 0.5 },
    ];
  }

  private withAlpha(color: string, alpha: number): string {
    if (color.startsWith('#') && color.length === 7) {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  }

  private pruneExpiredEffects(now: number): void {
    this.effects = this.effects.filter(fx => now - fx.startTime < fx.duration);
  }
}
