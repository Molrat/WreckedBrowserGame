import type { GameState } from "@/game/state/GameState";
import { IRenderer } from "@/deviceoutput/graphics/IRenderer";
import type { ICameraRenderAPI } from "@/deviceoutput/graphics/common/ICameraRenderAPI";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import { add, scale, type Vector2 } from "@/math/Vector2";

type WheelForces = { FL: Vector2; FR: Vector2; RL: Vector2; RR: Vector2 };

export class WheelForcesRenderer implements IRenderer {
  private readonly historySize = 4;
  private readonly forceHistory: Map<string, WheelForces[]> = new Map();

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === null)) return;
    const d = draw;
    const cars = state.entities.filter(isWithCarPhysics);
    for (const car of cars) {
      this.updateHistory(car.id, car);
      const avgForces = this.computeAverageForces(car.id);
      this.drawForces(d, car, avgForces);
    }
  }

  private updateHistory(carId: string, car: { forceFL: Vector2; forceFR: Vector2; forceRL: Vector2; forceRR: Vector2 }): void {
    const history = this.forceHistory.get(carId) ?? [];
    history.push({ FL: car.forceFL, FR: car.forceFR, RL: car.forceRL, RR: car.forceRR });
    if (history.length > this.historySize) history.shift();
    this.forceHistory.set(carId, history);
  }

  private computeAverageForces(carId: string): WheelForces {
    const history = this.forceHistory.get(carId) ?? [];
    const count = history.length || 1;
    const sum = { FL: { x: 0, y: 0 }, FR: { x: 0, y: 0 }, RL: { x: 0, y: 0 }, RR: { x: 0, y: 0 } };
    for (const frame of history) {
      sum.FL = add(sum.FL, frame.FL);
      sum.FR = add(sum.FR, frame.FR);
      sum.RL = add(sum.RL, frame.RL);
      sum.RR = add(sum.RR, frame.RR);
    }
    return {
      FL: scale(sum.FL, 1/count),
      FR: scale(sum.FR, 1/count),
      RL: scale(sum.RL, 1/count),
      RR: scale(sum.RR, 1/count),
    };
  }

  // Standard math: forward=+X, left=+Y, rotation counterclockwise
  private basis(ori: number){
    const f = { x: Math.cos(ori), y: Math.sin(ori) };
    const r = { x: -Math.sin(ori), y: Math.cos(ori) };
    return { f, r };
  }

  private wheelPos(car: { position: Vector2; orientation: number }, forwardOffset: number, leftOffset: number): Vector2 {
    const { f, r } = this.basis(car.orientation);
    return { 
      x: car.position.x + f.x * forwardOffset + r.x * leftOffset, 
      y: car.position.y + f.y * forwardOffset + r.y * leftOffset 
    };
  }

  private drawForces(d: ICameraRenderAPI, car: { position: Vector2; orientation: number; lengthToFrontAxle: number; lengthToRearAxle: number; trackHalfWidth: number }, forces: WheelForces): void {
    const halfTrack = car.trackHalfWidth;
    const FL = this.wheelPos(car, car.lengthToFrontAxle, +halfTrack);
    const FR = this.wheelPos(car, car.lengthToFrontAxle, -halfTrack);
    const RL = this.wheelPos(car, -car.lengthToRearAxle, +halfTrack);
    const RR = this.wheelPos(car, -car.lengthToRearAxle, -halfTrack);
    const scale = 1/1000;
    const arrows: Array<{pos: Vector2; force: Vector2}> = [
      { pos: FL, force: forces.FL },
      { pos: FR, force: forces.FR },
      { pos: RL, force: forces.RL },
      { pos: RR, force: forces.RR },
    ];
    for (const arrow of arrows) {
      const pos2 = { x: arrow.pos.x + arrow.force.x * scale, y: arrow.pos.y + arrow.force.y * scale };
      d.drawArrow(arrow.pos, pos2, '#ff3b30', 2);
    }
  }

  private drawCarOutline(d: ICameraRenderAPI, car: { position: Vector2; orientation: number; shape?: { type: string; points?: Vector2[] } }): void {
    if (car.shape?.type === 'polygon') {
      const pts = car.shape.points as Vector2[];
      const { f, r } = this.basis(car.orientation);
      const worldPts = pts.map(p => ({ x: car.position.x + f.x * p.y + r.x * p.x, y: car.position.y + f.y * p.y + r.y * p.x }));
      for (let i = 0; i < worldPts.length; i++) {
        const a = worldPts[i];
        const b = worldPts[(i + 1) % worldPts.length];
        d.drawLine(a, b, 'rgba(0,120,255,0.9)', 2);
      }
    }
  }
}
