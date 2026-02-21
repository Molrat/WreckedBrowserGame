import type { Vector2 } from "@/math/Vector2";
import type { LightningBolt, LightningSegment } from "./LightningBolt";

const STEP_SIZE = 10;
const STEP_VARIANCE = 6;
const DRIFT_RATE = 0.15;
const DRIFT_JITTER = 0.3;
const MIN_BRANCHES = 2;
const MAX_BRANCHES = 4;
const BRANCH_SPREAD = 0.6;
const WIDTH_DECAY = 0.5;
const MAX_BRANCH_DEPTH = 2;

export class LightningBoltGenerator {

  static generate(width: number, height: number, time: number): LightningBolt {
    const startX = Math.random() * width;
    const dir = Math.random() * Math.PI * 2;
    const length = Math.min(width, height) * (0.5 + Math.random() * 0.4);
    const segments: LightningSegment[] = [];
    this.buildTree({ x: startX, y: Math.random() * height }, dir, length, 2.5, 0, segments);
    return {
      segments,
      alpha: 1,
      createdAt: time,
      lifetime: 5 * (0.08 + Math.random() * 0.18),
      flashIntensity: 0.6 + Math.random() * 0.4,
    };
  }

  static generateAmbient(width: number, height: number, time: number): LightningBolt {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const dir = Math.random() * Math.PI * 2;
    const length = Math.min(width, height) * (0.15 + Math.random() * 0.2);
    const segments: LightningSegment[] = [];
    this.buildTree({ x: startX, y: startY }, dir, length, 1.2, MAX_BRANCH_DEPTH, segments);
    return {
      segments,
      alpha: 0.3 + Math.random() * 0.3,
      createdAt: time,
      lifetime: 0.04 + Math.random() * 0.08,
      flashIntensity: 0.2 + Math.random() * 0.2,
    };
  }

  private static buildTree(
    start: Vector2, direction: number, length: number,
    width: number, depth: number, out: LightningSegment[]
  ): void {
    const points = this.walkPath(start, direction, length);
    out.push({ points, width });
    if (depth >= MAX_BRANCH_DEPTH) return;
    this.spawnBranches(points, direction, length, width, depth, out);
  }

  private static walkPath(start: Vector2, dir: number, length: number): Vector2[] {
    const points: Vector2[] = [start];
    let current = { ...start };
    let travelled = 0;
    let currentDir = dir;

    while (travelled < length) {
      const step = STEP_SIZE + Math.random() * STEP_VARIANCE;
      currentDir += (Math.random() - 0.5) * DRIFT_JITTER;
      const angle = currentDir + (Math.random() - 0.5) * DRIFT_RATE;
      current = {
        x: current.x + Math.cos(angle) * step,
        y: current.y + Math.sin(angle) * step,
      };
      travelled += step;
      points.push({ ...current });
    }
    return points;
  }

  private static spawnBranches(
    trunk: Vector2[], parentDir: number, parentLen: number,
    parentWidth: number, depth: number, out: LightningSegment[]
  ): void {
    const count = MIN_BRANCHES + Math.floor(Math.random() * (MAX_BRANCHES - MIN_BRANCHES + 1));
    const candidates = this.branchCandidateIndices(trunk.length);
    const chosen = this.pickRandom(candidates, count);
    for (const i of chosen) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const branchDir = parentDir + side * (BRANCH_SPREAD + Math.random() * 0.3);
      const branchLen = parentLen * (0.25 + Math.random() * 0.2);
      const branchWidth = parentWidth * WIDTH_DECAY;
      this.buildTree(trunk[i], branchDir, branchLen, branchWidth, depth + 1, out);
    }
  }

  private static branchCandidateIndices(trunkLen: number): number[] {
    const indices: number[] = [];
    for (let i = 2; i < trunkLen - 1; i++) indices.push(i);
    return indices;
  }

  private static pickRandom(arr: number[], n: number): number[] {
    const pool = [...arr];
    const result: number[] = [];
    const pick = Math.min(n, pool.length);
    for (let i = 0; i < pick; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool[idx]);
      pool.splice(idx, 1);
    }
    return result;
  }
}
