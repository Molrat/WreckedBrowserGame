import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { clamp } from "@/math/numberFunctions";
import { Vector2, add, length, scale } from "@/math/Vector2";
import { ICarPhysicsComputer } from "./ICarPhysicsComputer";

export class CarPhysicsComputer implements ICarPhysicsComputer{
  compute(car: ICarState, dt: number): ICarState {
    const forward = this.forward(car.orientation);
    const right = this.right(forward);
    const local = this.toLocal(car.velocity, forward, right);
    const rearGrip = car.tireGripRear * (car.handBrake > 0 ? car.driftGripMultiplier : 1);

    // Map wheel angle (±maxSteeringWheelAngle) to tire angle (±maxSteeringAngle)
    const wheel = clamp(car.steeringWheelAngle, -car.maxSteeringWheelAngle, car.maxSteeringWheelAngle);
    const steer = (wheel / car.maxSteeringWheelAngle) * car.maxSteeringAngle;
    const _turningRadius = car.wheelBase / Math.tan(steer || 0.0001); // reserved for future use

    const longForce = this.longitudinalForce(local.x, car);
    const slip = this.slipForces(local, steer, rearGrip, car);

    // Body-frame integration with Coriolis terms
    const ax = longForce / car.mass;
    const ay = slip.latForce / car.mass;
    const newLocal = {
      x: local.x + (ax - car.angularVelocity * local.y) * dt,
      y: local.y + (ay + car.angularVelocity * local.x) * dt,
    };

    // Yaw integration from slip moment, with response smoothing
    const yawAcc = slip.mz / car.inertia;
    const yawRateTarget = newLocal.x * Math.tan(steer) / car.wheelBase;
    const smoothedYaw = this.integrateYawRate(yawRateTarget, car.angularVelocity + yawAcc * dt, car.steeringResponse, dt);
    const newOrientation = car.orientation + smoothedYaw * dt;

    // Convert back to world with updated orientation
    const f2 = this.forward(newOrientation);
    const r2 = this.right(f2);
    const newVelocity = this.toWorld(newLocal, f2, r2);
    const newPosition = add(car.position, scale(newVelocity, dt));

    return { ...car, position: newPosition, orientation: newOrientation, velocity: newVelocity, angularVelocity: smoothedYaw };
  }

  private forward(orientation: number): Vector2 {
    // Align with rendering: orientation 0 points up (negative Y in canvas)
    return { x: Math.sin(orientation), y: -Math.cos(orientation) };
  }
  private right(fwd: Vector2): Vector2 { return { x: -fwd.y, y: fwd.x }; }

  private toLocal(v: Vector2, fwd: Vector2, right: Vector2): { x: number; y: number } {
    return { x: v.x * fwd.x + v.y * fwd.y, y: v.x * right.x + v.y * right.y };
  }
  private toWorld(local: { x: number; y: number }, fwd: Vector2, right: Vector2): Vector2 {
    return add(scale(fwd, local.x), scale(right, local.y));
  }

  private longitudinalForce(localVelX: number, car: ICarState): number {
    const speedX = Math.abs(localVelX);
    const dir = speedX > 0.001 ? Math.sign(localVelX) : 0; // oppose motion; no reverse kick at near zero

    const engine = car.throttle * car.engineForce; // always forward
    const brakeOppose = -dir * (car.brake * car.brakeForce);
    const rollingOppose = -dir * (car.rollingResistance * speedX);
    const airOppose = -dir * (car.airDragCoefficient * speedX * speedX);

    return engine + brakeOppose + rollingOppose + airOppose;
  }

  private slipForces(local: { x: number; y: number }, steer: number, rearGrip: number, car: ICarState): { Fy_f: number; Fy_r: number; latForce: number; mz: number } {
    const a = car.wheelBase * 0.5 - car.centerOfMassOffset;
    const b = car.wheelBase - a;
    const u = local.x;
    const v = local.y;
    const r = car.angularVelocity;
    const denom = Math.max(0.5, Math.abs(u));
    const alpha_f = Math.atan2(v + a * r, denom) - steer;
    const alpha_r = Math.atan2(v - b * r, denom);
    const Cf = car.tireGripFront * 50000;
    const Cr = rearGrip * 50000;
    const Fy_f = -Cf * alpha_f;
    const Fy_r = -Cr * alpha_r;
    const latForce = Fy_f + Fy_r;
    const mz = a * Fy_f - b * Fy_r;
    return { Fy_f, Fy_r, latForce, mz };
  }

  private integrateLocal(local: { x: number; y: number }, longForce: number, latForce: number, mass: number, dt: number): { x: number; y: number } {
    const ax = longForce / mass;
    const ay = latForce / mass;
    return { x: local.x + ax * dt, y: local.y + ay * dt };
  }

  private integrateYawRate(target: number, current: number, response: number, dt: number): number {
    const alpha = Math.min(1, response * dt);
    return current + (target - current) * alpha;
  }
}