import type { GameState } from "@/game/state/GameState";
import { IRenderer } from "@/deviceOutput/render/IRenderer";
import type { ICameraRenderAPI } from "@/deviceOutput/render/common/ICameraRenderAPI";
import { isWithCarPhysics } from "@/game/queries/WithCarPhysics/isWithCarPhysics";
import type { Vector2 } from "@/math/Vector2";

export class WheelForcesRenderer implements IRenderer {

  render(state: GameState, draw: ICameraRenderAPI): void {
    if (!(state.ui.openMenu === 'controllerTest' || state.ui.openMenu === null)) return;
    const d = draw;
    const cars = state.entities.filter(isWithCarPhysics);
    for (const car of cars) {
      this.drawCarOutline(d, car);
      this.drawForces(d, car);
    }
  }

  // Standard math: forward=+X, left=+Y, rotation counterclockwise
  private basis(ori: number){
    const f = { x: Math.cos(ori), y: Math.sin(ori) };
    const r = { x: -Math.sin(ori), y: Math.cos(ori) };
    return { f, r };
  }

  private wheelPos(car: any, forwardOffset: number, leftOffset: number): Vector2 {
    const { f, r } = this.basis(car.orientation);
    return { 
      x: car.position.x + f.x * forwardOffset + r.x * leftOffset, 
      y: car.position.y + f.y * forwardOffset + r.y * leftOffset 
    };
  }

  private drawForces(d: ICameraRenderAPI, car: any){
    const halfTrack = car.trackHalfWidth;
    // Forward=+X, Left=+Y, Right=-Y
    const FL = this.wheelPos(car, car.lengthToFrontAxle, +halfTrack);
    const FR = this.wheelPos(car, car.lengthToFrontAxle, -halfTrack);
    const RL = this.wheelPos(car, -car.lengthToRearAxle, +halfTrack);
    const RR = this.wheelPos(car, -car.lengthToRearAxle, -halfTrack);
    const scale = 1/2000; // N->m scaling for visualization
    const arrows: Array<{pos:Vector2,force:Vector2}> = [
      { pos: FL, force: car.forceFL },
      { pos: FR, force: car.forceFR },
      { pos: RL, force: car.forceRL },
      { pos: RR, force: car.forceRR },
    ];
    for (const arrow of arrows){
      const pos2 = { x: arrow.pos.x + arrow.force.x * scale, y: arrow.pos.y + arrow.force.y * scale };
      d.drawArrow(arrow.pos, pos2, '#ff3b30', 2);
    }
  }

  private drawCarOutline(d: ICameraRenderAPI, car: any){
    if (car.shape?.type === 'polygon'){
      const pts = car.shape.points as Vector2[];
      const { f, r } = this.basis(car.orientation);
      const worldPts = pts.map(p => ({ x: car.position.x + f.x * p.y + r.x * p.x, y: car.position.y + f.y * p.y + r.y * p.x }));
      for (let i=0;i<worldPts.length;i++){
        const a = worldPts[i];
        const b = worldPts[(i+1)%worldPts.length];
        d.drawLine(a, b, 'rgba(0,120,255,0.9)', 2);
      }
    }
  }
}
