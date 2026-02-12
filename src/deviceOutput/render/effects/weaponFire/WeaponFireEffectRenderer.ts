import { GameEvent } from "@/game/events/eventTypes/GameEvent";
import { IEffectRenderer } from "@/deviceOutput/render/effects/IEffectRenderer";
import { DeathExplosionEffect } from "@/deviceOutput/render/effects/deathExplosion/DeathExplosionEffect";
import { createExplosionParticles } from "@/deviceOutput/render/effects/deathExplosion/createExplosionParticles";
import { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";

export class WeaponFireEffectRenderer implements IEffectRenderer {
  private effects: DeathExplosionEffect[] = [];
  constructor(private draw: ICameraRenderAPI) {}

  render(events: GameEvent[]): void {
    const now = performance.now();
    this.ingestEvents(events, now);
    this.renderEffects(now);
    this.pruneExpiredEffects(now);
  }

  private ingestEvents(events: GameEvent[], now: number): void {
    for (const ev of events) {
      if (ev.type === 'WeaponFired') {
        this.effects.push({
          position: ev.position,
          color: ev.color,
          startTime: now,
          duration: 800,
          particles: createExplosionParticles(12),
        });
      }
    }
  }

  private renderEffects(now: number): void {
    for (const fx of this.effects) {
      const t = (now - fx.startTime) / fx.duration;
      if (t >= 1) continue;
      this.renderExplosion(fx, t);
    }
  }

  private renderExplosion(fx: DeathExplosionEffect, t: number): void {
    const easeOut = 1 - Math.pow(1 - t, 3);
    const alpha = Math.pow(1 - t, 2);
    const s = 0.6 + easeOut * 0.8;
    for (const p of fx.particles) {
      const dist = p.speed * easeOut * s * 0.5;
      const x = fx.position.x + Math.cos(p.angle) * dist;
      const y = fx.position.y + Math.sin(p.angle) * dist;
      const rot = p.rotationSpeed * t * fx.duration / 1000;
      const size = p.size * 0.6 * (1 - easeOut * 0.4);
      this.draw.drawPolygon({
        shape: [
          { x: 0, y: -size },
          { x: size * 0.866, y: size * 0.5 },
          { x: -size * 0.866, y: size * 0.5 },
        ],
        position: { x, y },
        orientation: rot,
        fillColor: this.withAlpha(fx.color, alpha),
        borderColor: this.withAlpha('#ffffff', alpha * 0.4),
        borderWidth: 1,
        depth: 100,
      });
    }
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
