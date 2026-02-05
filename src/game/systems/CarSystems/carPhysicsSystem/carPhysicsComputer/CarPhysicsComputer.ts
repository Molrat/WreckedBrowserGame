import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { Vector2, add, scale, rotate } from "@/math/Vector2";
import { ICarPhysicsComputer } from "./ICarPhysicsComputer";
import { perpendicular, length } from "@/math/Vector2";
import { ILocalWheelForceComputer } from "./wheelForce/ILocalWheelForceComputer";
import { updateWheelOmega, updateWheelOmegaStatic } from "./wheelForce/updateWheelOmega";
import { wheelForceToWorld } from "./wheelForce/wheelForceToWorld";
import { computeAirDrag } from "./airDrag/computeAirDrag";

export class CarPhysicsComputer implements ICarPhysicsComputer {
  constructor(private readonly wheelForceComputer: ILocalWheelForceComputer) {}

  compute(car: ICarState, dt: number): ICarState {
    const gravity = 9.81;
    const wheelbase = car.lengthToFrontAxle + car.lengthToRearAxle;
    const safeWheelbase = Math.max(1e-3, wheelbase);

    // Normal forces per wheel
    const frontNormal = car.mass * gravity * (car.lengthToRearAxle / safeWheelbase) / 2;
    const rearNormal = car.mass * gravity * (car.lengthToFrontAxle / safeWheelbase) / 2;
    const normalForces = [frontNormal, frontNormal, rearNormal, rearNormal];

    // Wheel definitions: localPos (+x forward, +y left), steer, omega
    const wheels = [
      { localPos: { x: car.lengthToFrontAxle, y: car.trackHalfWidth }, steer: car.frontWheelAngle, omega: car.omegaFL },
      { localPos: { x: car.lengthToFrontAxle, y: -car.trackHalfWidth }, steer: car.frontWheelAngle, omega: car.omegaFR },
      { localPos: { x: -car.lengthToRearAxle, y: car.trackHalfWidth }, steer: 0, omega: car.omegaRL },
      { localPos: { x: -car.lengthToRearAxle, y: -car.trackHalfWidth }, steer: 0, omega: car.omegaRR },
    ];
    // Car forces:
    const engineForce = car.throttle * car.engineForce;
    const brakeForce = car.brake * car.brakeForce;
    const airResistance = computeAirDrag(car.velocity, car.orientation, car.airDragCoefficient);

    // Torque distribution
    const engineTorquePerWheel = engineForce * car.wheelRadius / 4;
    const brakeTorquePerWheel = brakeForce * car.wheelRadius / 4;
    const handbrakeRear = car.handBrake * car.brakeForce * car.wheelRadius / 4;
    const wheelInertia = 0.7 * 10 * car.wheelRadius * car.wheelRadius;

    let totalForce: Vector2 = { x: 0, y: 0 };
    let totalYawMoment = 0;
    const forces: Vector2[] = [];
    const newOmegas: number[] = [];

    for (let i = 0; i < 4; i++) {
      const w = wheels[i];
      const wheelWorldAngle = car.orientation + w.steer;

      // Contact point world position and velocity
      const contactWorld = rotate(w.localPos, car.orientation);
      const contactVel = add(car.velocity, scale(perpendicular(contactWorld), car.angularVelocity));

      // Transform velocity to wheel's local frame: 
      // (We turn the axis so that y points towards forward direction of wheel)
      const velInWheelFrame = rotate(contactVel, Math.PI / 2 -wheelWorldAngle);
      
      // Compute ground force in wheel's local frame
      let localForce = this.wheelForceComputer.compute({
        velocityInWheelFrame: velInWheelFrame,
        wheelAngularSpeed: w.omega,
        wheelRadius: car.wheelRadius,
        normalForce: normalForces[i],
        mu: car.tireMu,
        longitudalStiffness: car.tireStiffness,
        lateralStiffness: car.tireStiffness,
      });
      // localForce = {
      //   x: Math.sign(localForce.x) * maxTireForce.x,
      //   y: Math.sign(localForce.y) * maxTireForce.y,
      // }
      // isStatic = true;
      // Update wheel omega
      let newOmega: number;
      const brakeTorque = brakeTorquePerWheel + (i >= 2 ? handbrakeRear : 0);
      newOmega = updateWheelOmega({
        groundForceLongitudinal: localForce.y,
        wheelRadius: car.wheelRadius,
        engineTorque: engineTorquePerWheel,
        brakeTorque,
        wheelInertia,
        currentOmega: w.omega,
        dt,
      });
      
      newOmegas.push(newOmega);

      // Transform force to world frame
      const forceWorld = wheelForceToWorld(localForce, wheelWorldAngle);
      forces.push(forceWorld);

      // Accumulate forces and yaw moment
      totalForce = add(totalForce, forceWorld);
      totalYawMoment += contactWorld.x * forceWorld.y - contactWorld.y * forceWorld.x;
    }

    // Air drag
    totalForce = add(totalForce, airResistance);

    // Update car velocity and angular velocity
    const accel = scale(totalForce, 1 / car.mass);
    const newVelocity = add(car.velocity, scale(accel, dt));
    const yawInertia = car.mass * safeWheelbase * safeWheelbase / 12;
    const newAngularVelocity = car.angularVelocity + (totalYawMoment / Math.max(1e-3, yawInertia)) * dt;

    return {
      ...car,
      position: add(car.position, scale(newVelocity, dt)),
      orientation: car.orientation + newAngularVelocity * dt,
      velocity: newVelocity,
      angularVelocity: newAngularVelocity,
      frontWheelAngle: car.frontWheelAngle,
      omegaFL: newOmegas[0], omegaFR: newOmegas[1], omegaRL: newOmegas[2], omegaRR: newOmegas[3],
      forceFL: forces[0], forceFR: forces[1], forceRL: forces[2], forceRR: forces[3],
    };
  }

  computeStaticCentrifugalForce(car: ICarState): number {
    if (Math.abs(car.frontWheelAngle) < 0.01) return 0;
    const distanceBetweenAxles = car.lengthToFrontAxle + car.lengthToRearAxle;
    const turningRadius = distanceBetweenAxles / Math.sin(Math.abs(car.frontWheelAngle));
    const carSpeed = length(car.velocity);
    const centrifugalForce = car.mass * (carSpeed * carSpeed) / turningRadius;
    return centrifugalForce;
  }
}