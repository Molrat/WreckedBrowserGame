import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { Vector2, add, scale, rotate } from "@/math/Vector2";
import { IDrivingPhysicsComputer } from "./IDrivingPhysicsComputer";
import { perpendicular } from "@/math/Vector2";
import { ILocalWheelForceComputer } from "./wheelForce/ILocalWheelForceComputer";
import { updateWheelOmega } from "./wheelForce/updateWheelOmega";
import { wheelForceToWorld } from "./wheelForce/wheelForceToWorld";
import { computeAirDrag } from "./airDrag/computeAirDrag";
import type { AppliedForce } from "@/game/state/components/physics/AppliedForce";

export class DrivingPhysicsComputer implements IDrivingPhysicsComputer {
  constructor(private readonly wheelForceComputer: ILocalWheelForceComputer) {}

  compute(car: ICarState, dt: number): Partial<ICarState> {
    const gravity = 9.81;
    const wheelbase = car.lengthToFrontAxle + car.lengthToRearAxle;

    const frontNormal = car.mass * gravity * (car.lengthToRearAxle / wheelbase) / 2;
    const rearNormal = car.mass * gravity * (car.lengthToFrontAxle / wheelbase) / 2;
    const normalForces = [frontNormal, frontNormal, rearNormal, rearNormal];

    const wheels = [
      { localPos: { x: car.lengthToFrontAxle, y: car.trackHalfWidth }, steer: car.frontWheelAngle, omega: car.omegaFL },
      { localPos: { x: car.lengthToFrontAxle, y: -car.trackHalfWidth }, steer: car.frontWheelAngle, omega: car.omegaFR },
      { localPos: { x: -car.lengthToRearAxle, y: car.trackHalfWidth }, steer: 0, omega: car.omegaRL },
      { localPos: { x: -car.lengthToRearAxle, y: -car.trackHalfWidth }, steer: 0, omega: car.omegaRR },
    ];

    const engineForce = car.throttle * car.engineForce;
    const brakeForce = car.brake * car.brakeForce;
    const engineTorquePerWheel = engineForce * car.wheelRadius / 4;
    const brakeTorquePerWheel = brakeForce * car.wheelRadius / 4;
    const handbrakeRear = car.handBrake * car.brakeForce * 2 *  car.wheelRadius / 4;
    const wheelInertia = 0.7 * 10 * car.wheelRadius * car.wheelRadius;

    const appliedForces: AppliedForce[] = [];
    const debugForces: Vector2[] = [];
    const newOmegas: number[] = [];

    for (let i = 0; i < 4; i++) {
      const w = wheels[i];
      const wheelWorldAngle = car.orientation + w.steer;
      const contactWorld = rotate(w.localPos, car.orientation);
      const contactVel = add(car.velocity, scale(perpendicular(contactWorld), car.angularVelocity));
      const velInWheelFrame = rotate(contactVel, Math.PI / 2 - wheelWorldAngle);

      const localForce = this.wheelForceComputer.compute({
        velocityInWheelFrame: velInWheelFrame,
        wheelAngularSpeed: w.omega,
        wheelRadius: car.wheelRadius,
        normalForce: normalForces[i],
        mu: car.tireMu,
        longitudalStiffness: car.tireStiffness,
        lateralStiffness: car.tireStiffness,
      });

      const brakeTorque = brakeTorquePerWheel + (i >= 2 ? handbrakeRear : 0);
      newOmegas.push(updateWheelOmega({
        groundForceLongitudinal: localForce.y,
        wheelRadius: car.wheelRadius,
        engineTorque: engineTorquePerWheel,
        brakeTorque,
        wheelInertia,
        currentOmega: w.omega,
        dt,
      }));

      const forceWorld = wheelForceToWorld(localForce, wheelWorldAngle);
      debugForces.push(forceWorld);
      appliedForces.push({ force: forceWorld, localContactPoint: w.localPos });
    }

    // Air drag applied at center of mass (local origin)
    const airResistance = computeAirDrag(car.velocity, car.orientation, car.airDragCoefficient);
    appliedForces.push({ force: airResistance, localContactPoint: { x: 0, y: 0 } });

    // Add all wheel and drag forces to the entity's force list
    car.forces.push(...appliedForces);

    return {
      frontWheelAngle: car.frontWheelAngle,
      omegaFL: newOmegas[0], omegaFR: newOmegas[1], omegaRL: newOmegas[2], omegaRR: newOmegas[3],
      forceFL: debugForces[0], forceFR: debugForces[1], forceRL: debugForces[2], forceRR: debugForces[3],
    };
  }
}