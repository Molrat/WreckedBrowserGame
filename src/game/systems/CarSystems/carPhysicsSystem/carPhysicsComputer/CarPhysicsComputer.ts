import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { Vector2, add, scale, rotate } from "@/math/Vector2";
import { ICarPhysicsComputer } from "./ICarPhysicsComputer";
import { perpendicular } from "./vectorHelpers";
import { computeWheelForce } from "./wheelForce/computeWheelForce";
import { computeAirDrag } from "./airDrag/computeAirDrag";

export class CarPhysicsComputer implements ICarPhysicsComputer {
  compute(car: ICarState, dt: number): ICarState {
    const frontSteeringAngle = car.frontWheelAngle;
    const wheelbase = car.lengthToFrontAxle + car.lengthToRearAxle;
    const safeWheelbase = Math.max(1e-3, wheelbase);
    const gravity = 9.81;

    const frontAxleNormal = car.mass * gravity * (car.lengthToRearAxle / safeWheelbase);
    const rearAxleNormal = car.mass * gravity * (car.lengthToFrontAxle / safeWheelbase);
    const normalForces = [frontAxleNormal / 2, frontAxleNormal / 2, rearAxleNormal / 2, rearAxleNormal / 2];
    const gripFactors = [car.tireGripFrontScalar, car.tireGripFrontScalar, car.tireGripRearScalar, car.tireGripRearScalar];

    const wheels = [
      { localPos: { x: +car.lengthToFrontAxle, y: +car.trackHalfWidth }, steer: frontSteeringAngle, omega: car.omegaFL },
      { localPos: { x: +car.lengthToFrontAxle, y: -car.trackHalfWidth }, steer: frontSteeringAngle, omega: car.omegaFR },
      { localPos: { x: -car.lengthToRearAxle,  y: +car.trackHalfWidth }, steer: 0, omega: car.omegaRL },
      { localPos: { x: -car.lengthToRearAxle,  y: -car.trackHalfWidth }, steer: 0, omega: car.omegaRR },
    ];

    const engineTorquePerWheel = car.throttle * car.engineForce * car.wheelRadius / 4;
    const brakeTorquePerWheel = car.brake * car.brakeForce * car.wheelRadius / 4;
    const handbrakeRearExtra = car.handBrake * car.brakeForce * car.wheelRadius / 4;
    const wheelInertia = 0.7 * 10 * car.wheelRadius * car.wheelRadius;

    let totalForce: Vector2 = { x: 0, y: 0 };
    let totalYawMoment = 0;
    const forces: Vector2[] = [];
    const slipsLong: number[] = [];
    const slipsLat: number[] = [];
    const newOmegas: number[] = [];

    for (let i = 0; i < 4; i++) {
      const contactWorld = rotate(wheels[i].localPos, car.orientation);
      const contactVel = add(car.velocity, scale(perpendicular(contactWorld), car.angularVelocity));
      const brakeTorque = brakeTorquePerWheel + (i >= 2 ? handbrakeRearExtra : 0);

      const result = computeWheelForce({
        contactVelocityWorld: contactVel, carOrientation: car.orientation, steeringAngle: wheels[i].steer,
        wheelAngularSpeed: wheels[i].omega, wheelRadius: car.wheelRadius, wheelInertia,
        normalForce: normalForces[i], mu: car.tireMu, engineTorque: engineTorquePerWheel, brakeTorque,
        rollingResistance: car.rollingResistance, tireGripBuildUp: car.tireGripBuildUp * gripFactors[i],
        tireGripDropOff: car.tireGripDropOff, tireGripBuildUpLatScalar: car.tireGripBuildUpLatScalar,
        tireGripDropOffLatScalar: car.tireGripDropOffLatScalar, maxGripLatScalar: car.maxGripLatScalar, dt,
      });

      forces.push(result.forceWorld);
      newOmegas.push(result.newAngularSpeed);
      slipsLong.push(result.slipRatioAbs);
      slipsLat.push(result.slipAngleAbs);
      totalForce = add(totalForce, result.forceWorld);
      totalYawMoment += contactWorld.x * result.forceWorld.y - contactWorld.y * result.forceWorld.x;
    }

    const dragForce = computeAirDrag(car.velocity, car.orientation, car.airDragCoefficient);
    totalForce = add(totalForce, dragForce);

    const accel = scale(totalForce, 1 / car.mass);
    const newVelocity = add(car.velocity, scale(accel, dt));
    const yawInertia = car.mass * safeWheelbase * safeWheelbase / 12;
    const newAngularVelocity = car.angularVelocity + (totalYawMoment / Math.max(1e-3, yawInertia)) * dt;

    return {
      ...car,
      position: add(car.position, scale(newVelocity, dt)),
      orientation: car.orientation + newAngularVelocity * dt,
      velocity: newVelocity, angularVelocity: newAngularVelocity, frontWheelAngle: frontSteeringAngle,
      omegaFL: newOmegas[0], omegaFR: newOmegas[1], omegaRL: newOmegas[2], omegaRR: newOmegas[3],
      slipRatioFL: slipsLong[0], slipRatioFR: slipsLong[1], slipRatioRL: slipsLong[2], slipRatioRR: slipsLong[3],
      slipAngleFL: slipsLat[0], slipAngleFR: slipsLat[1], slipAngleRL: slipsLat[2], slipAngleRR: slipsLat[3],
      forceFL: forces[0], forceFR: forces[1], forceRL: forces[2], forceRR: forces[3],
    };
  }
}