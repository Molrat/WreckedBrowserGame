import type { LightningBolt } from "./LightningBolt";
import { LightningBoltGenerator } from "./LightningBoltGenerator";

export class LightningStormManager {
  private bolts: LightningBolt[] = [];
  private nextMainBolt = 0;
  private nextAmbientBolt = 0;

  update(time: number, width: number, height: number): LightningBolt[] {
    this.removeExpired(time);
    this.spawnMainBolt(time, width, height);
    this.spawnAmbientBolt(time, width, height);
    this.updateAlphas(time);
    return this.bolts;
  }

  private removeExpired(time: number): void {
    this.bolts = this.bolts.filter(b => time - b.createdAt < b.lifetime);
  }

  private spawnMainBolt(time: number, width: number, height: number): void {
    if (time < this.nextMainBolt) return;
    this.bolts.push(LightningBoltGenerator.generate(width, height, time));
    this.nextMainBolt = time + 0.8 + Math.random() * 2.5;
  }

  private spawnAmbientBolt(time: number, width: number, height: number): void {
    if (time < this.nextAmbientBolt) return;
    this.bolts.push(LightningBoltGenerator.generateAmbient(width, height, time));
    this.nextAmbientBolt = time + 0.1 + Math.random() * 0.4;
  }

  private updateAlphas(time: number): void {
    for (const bolt of this.bolts) {
      const age = time - bolt.createdAt;
      const progress = age / bolt.lifetime;
      bolt.alpha = this.flickerAlpha(progress, bolt.flashIntensity);
    }
  }

  private flickerAlpha(progress: number, intensity: number): number {
    if (progress < 0.1) return intensity;
    if (progress < 0.2) return intensity * 0.4;
    if (progress < 0.3) return intensity * 0.9;
    return intensity * Math.max(0, 1 - progress) * 0.7;
  }
}
