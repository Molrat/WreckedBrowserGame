import type { GameState } from "@/game/state/GameState";
import { IRenderer } from "@/deviceOutput/render/IRenderer";
import type { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";
import type { Vector2 } from "@/math/Vector2";

export class RandomTrackRenderer implements IRenderer {
  private outer: Vector2[] | null = null;
  private inner: Vector2[] | null = null;

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    const d = draw;
    if (!this.outer || !this.inner) {
      const center = state.camera ? state.camera.position : { x: 0, y: 0 };
      this.generate(center);
    }
    // Outline outer and inner boundaries
    this.strokeClosed(this.outer!, '#808080', 3, draw);
    this.strokeClosed(this.inner!, '#808080', 3, draw);
    // Centerline
    for (let i = 0; i < this.outer!.length; i++) {
      const a = this.outer![i];
      const b = this.inner![i];
      d.drawLine(a, b, 'rgba(255,255,255,0.08)', 1);
    }
  }

  private strokeClosed(pts: Vector2[], color: string, lw: number, draw: ICameraRenderAPI) {
    const d = draw;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      d.drawLine(a, b, color, lw);
    }
  }

  private generate(center: Vector2) {
    const count = 20;          // number of control points (turns)
    const width = 12;          // track width (m)
    const minR = 80, maxR = 160;
    const pts: Vector2[] = [];
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r = minR + Math.random() * (maxR - minR);
      pts.push({ x: center.x + r * Math.cos(ang), y: center.y + r * Math.sin(ang) });
    }
    // Order points by angle to avoid self-intersections
    const ordered = pts
      .map(p => ({ p, a: Math.atan2(p.y - center.y, p.x - center.x) }))
      .sort((u, v) => u.a - v.a)
      .map(u => u.p);
    // Chaikin smoothing (two iterations)
    const smooth1: Vector2[] = [];
    for (let i = 0; i < ordered.length; i++) {
      const a = ordered[i];
      const b = ordered[(i + 1) % ordered.length];
      smooth1.push({ x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y });
      smooth1.push({ x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y });
    }
    const smooth: Vector2[] = [];
    for (let i = 0; i < smooth1.length; i++) {
      const a = smooth1[i];
      const b = smooth1[(i + 1) % smooth1.length];
      smooth.push({ x: 0.75 * a.x + 0.25 * b.x, y: 0.75 * a.y + 0.25 * b.y });
      smooth.push({ x: 0.25 * a.x + 0.75 * b.x, y: 0.25 * a.y + 0.75 * b.y });
    }
    // Offset to build inner/outer boundaries using local normals
    const outer: Vector2[] = [];
    const inner: Vector2[] = [];
    const hw = width / 2;
    for (let i = 0; i < smooth.length; i++) {
      const prev = smooth[(i + smooth.length - 1) % smooth.length];
      const next = smooth[(i + 1) % smooth.length];
      const tx = next.x - prev.x;
      const ty = next.y - prev.y;
      const len = Math.sqrt(tx * tx + ty * ty) || 1;
      const nx = -ty / len;
      const ny = tx / len;
      outer.push({ x: smooth[i].x + nx * hw, y: smooth[i].y + ny * hw });
      inner.push({ x: smooth[i].x - nx * hw, y: smooth[i].y - ny * hw });
    }
    this.outer = outer;
    this.inner = inner;
  }
}
