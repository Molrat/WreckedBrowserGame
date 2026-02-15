import { EventBus } from '@/game/events/EventBus';
import { ISystem } from '@/game/systems/ISystem';
import type { GameState } from '@/game/state/GameState';
import { isControllablePositionable } from '@/game/queries/ControllablePositionable/isControllablePositionable';
import type { IControllablePositionable } from '@/game/queries/ControllablePositionable/IControllablePositionable';
import type { ICameraConfig } from '@/deviceOutput/render/ICameraConfig';
import type { Vector2 } from '@/math/Vector2';
import { scale, normalize, angleToUnitVector, length, rotate, add, subtract } from '@/math/Vector2';
import { computeBoundingBox } from '@/math/boundingBox';
import { smoothDamp } from '@/math/smoothDamp';
import { nextId } from '@/utils/id';
import type { Identifiable } from '@/game/state/components/Identifiable';
import type { Physical } from '@/game/state/components/Physical';

type CameraDebugEntity = Identifiable & Physical & { isCameraDebug: true };

export class CameraSystem implements ISystem {
  constructor(private readonly config: ICameraConfig) {}

  update(state: GameState, _eventBus: EventBus, dt: number): void {
    const targets = state.entities.filter(isControllablePositionable);
    if (targets.length === 0) return;

    const perTargetPoints = this.computeMarginPointsPerTarget(targets);
    const allPoints = perTargetPoints.flat();
    const box = computeBoundingBox(allPoints, state.aspectRatio);
    const cam = state.camera;
    const st = this.config.smoothTime;

    const xResult = smoothDamp(cam.position.x, box.centerX, cam.velocity.x, st, dt);
    const yResult = smoothDamp(cam.position.y, box.centerY, cam.velocity.y, st, dt);
    const wResult = smoothDamp(cam.width, box.width, cam.widthVelocity, st, dt);
    const hResult = smoothDamp(cam.height, box.height, cam.heightVelocity, st, dt);

    cam.position.x = xResult.value;
    cam.position.y = yResult.value;
    cam.velocity.x = xResult.velocity;
    cam.velocity.y = yResult.velocity;
    cam.width = wResult.value;
    cam.height = hResult.value;
    cam.widthVelocity = wResult.velocity;
    cam.heightVelocity = hResult.velocity;

    //this.updateDebugEntities(state, targets, perTargetPoints);
  }

  private computeMarginPointsPerTarget(targets: IControllablePositionable[]): Vector2[][] {
    const m = this.config.marginMeters;
    const rearFrac = this.config.rearMarginFraction;
    const sideFrac = this.config.sideMarginFraction;

    return targets.map(t => {
      const speed = length(t.velocity);
      const useVelocity = speed >= 2;
      const dir = useVelocity ? normalize(t.velocity) : angleToUnitVector(t.orientation);
      const side = rotate(dir, Math.PI / 2);

      const speedFactor = this.speedFactor(speed);
      const startFactor = 0.4;
      const scaledFrontFrac = this.scaleComputer(startFactor, 1, speedFactor);
      const scaledSideFrac = this.scaleComputer(startFactor, sideFrac, speedFactor);
      const scaledRearFrac = this.scaleComputer(startFactor, rearFrac, speedFactor);
      return [
        add(t.position, scale(dir, m * scaledFrontFrac)),        // front
        add(t.position, scale(side, m * scaledSideFrac)),       // left
        add(t.position, scale(dir, -m * scaledRearFrac)),       // rear
        add(t.position, scale(side, -m * scaledSideFrac)),      // right
      ];
    });
  }

  private speedFactor(speed: number): number {
    // remains 0 for speed < a, grows to 1 in between a and b, remains 1 for speed > b
      const a  = 5; // m/s
      const b = 30; // m/s
      const slope = 1 / (b - a);
      const y_zero = - a * slope;
      const clampedSpeed = Math.max(a, Math.min(b, speed));
      return y_zero + slope * clampedSpeed; 
  }

  private scaleComputer(startVal: number, endVal: number, speedFactor: number): number {
    // returns startVal for speedFactor=0, endVal for speedFactor=1
    const slope = endVal - startVal;
    return startVal + slope * speedFactor;
  }

  private updateDebugEntities(
    state: GameState,
    targets: IControllablePositionable[],
    perTargetPoints: Vector2[][],
  ): void {
    state.entities = state.entities.filter(
      e => !('isCameraDebug' in e && (e as CameraDebugEntity).isCameraDebug),
    );
    for (let i = 0; i < targets.length; i++) {
      const pts = perTargetPoints[i];
      const center = targets[i].position;
      const shape = pts.map(p => subtract(p, center));
      const entity: CameraDebugEntity = {
        id: nextId(),
        isCameraDebug: true,
        position: { x: center.x, y: center.y },
        orientation: 0,
        shape,
        fillColor: null,
        borderColor: 'rgba(255, 255, 0, 0.6)',
        borderWidth: 2,
        depth: 10,
      };
      state.entities.push(entity);
    }
  }
}
