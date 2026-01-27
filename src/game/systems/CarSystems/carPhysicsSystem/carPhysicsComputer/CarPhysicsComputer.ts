import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { Vector2, add, scale, rotate } from "@/math/Vector2";
import { ICarPhysicsComputer } from "./ICarPhysicsComputer";

export class CarPhysicsComputer implements ICarPhysicsComputer {
  compute(car: ICarState, dt: number): ICarState {
    const direction = (angle: number): Vector2 => ({ x: Math.cos(angle), y: Math.sin(angle) });
    const perpendicular = (v: Vector2): Vector2 => ({ x: -v.y, y: v.x });
    const dotProduct = (a: Vector2, b: Vector2): number => a.x * b.x + a.y * b.y;

    // Steering angle already computed by the control system
    const frontSteeringAngle = car.frontWheelAngle;

    // Normal forces per axle
    const computedWheelbase = car.lengthToFrontAxle + car.lengthToRearAxle;
    const gravity = 9.81;
    const safeWheelbase = Math.max(1e-3, computedWheelbase);
    const frontAxleNormal = car.mass * gravity * (car.lengthToRearAxle / safeWheelbase);
    const rearAxleNormal = car.mass * gravity * (car.lengthToFrontAxle / safeWheelbase);
    const normalForces = [frontAxleNormal / 2, frontAxleNormal / 2, rearAxleNormal / 2, rearAxleNormal / 2];
    const gripFactors = [car.tireGripFront, car.tireGripFront, car.tireGripRear, car.tireGripRear];

    // Wheel definitions (local positions and initial angular speeds)
    const wheels = [
      { localPosition: { x: car.lengthToFrontAxle, y: -car.trackHalfWidth }, steeringAngle: frontSteeringAngle, angularSpeed: car.omegaFL },
      { localPosition: { x: car.lengthToFrontAxle, y: +car.trackHalfWidth }, steeringAngle: frontSteeringAngle, angularSpeed: car.omegaFR },
      { localPosition: { x: -car.lengthToRearAxle, y: -car.trackHalfWidth }, steeringAngle: 0,                    angularSpeed: car.omegaRL },
      { localPosition: { x: -car.lengthToRearAxle, y: +car.trackHalfWidth }, steeringAngle: 0,                    angularSpeed: car.omegaRR },
    ];

    // AWD torque distribution and braking
    const engineTorquePerWheel = car.throttle * car.engineForce * car.wheelRadius / 4;
    const brakeTorquePerWheel = car.brake * car.brakeForce * car.wheelRadius / 4;
    const handbrakeExtraRearTorque = car.handBrake * car.brakeForce * car.wheelRadius / 4;

    let totalForceWorld: Vector2 = { x: 0, y: 0 };
    let totalYawMoment = 0;
    const perWheelForceWorld: Vector2[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    const perWheelSlipLongitudinal = [0, 0, 0, 0];
    const perWheelSlipLateral = [0, 0, 0, 0];
    const wheelInertia = Math.max(1e-3, 0.02 * car.mass * car.wheelRadius * car.wheelRadius);

    for (let i = 0; i < 4; i++) {
      // 1. Contact velocity (world space)
      const contactPointWorld = rotate(wheels[i].localPosition, car.orientation);
      const contactVelocityWorld = add(car.velocity, scale(perpendicular(contactPointWorld), car.angularVelocity));

      // 2. Transform velocity into wheel local space
      const wheelYaw = car.orientation + wheels[i].steeringAngle;
      const forwardVector = direction(wheelYaw);
      const sideVector = perpendicular(forwardVector);
      const forwardSpeed = dotProduct(contactVelocityWorld, forwardVector);
      const sideSpeed = dotProduct(contactVelocityWorld, sideVector);

      // 3. Compute slip
      const wheelSurfaceSpeed = wheels[i].angularSpeed * car.wheelRadius;
      const longitudinalSlip = wheelSurfaceSpeed - forwardSpeed;
      const lateralSlip = sideSpeed;
      perWheelSlipLongitudinal[i] = longitudinalSlip;
      perWheelSlipLateral[i] = lateralSlip;

      // 4. Raw tire forces from slip
      const longitudinalStiffness = car.tireStiffLong * gripFactors[i];
      const lateralStiffness = car.tireStiffLat * gripFactors[i];
      let longitudinalForceRaw = -longitudinalSlip * longitudinalStiffness;
      let lateralForceRaw = -lateralSlip * lateralStiffness;

      // 5. Enforce friction circle
      const maxFrictionForce = car.tireMu * normalForces[i];
      const rawMagnitude = Math.hypot(longitudinalForceRaw, lateralForceRaw);
      const scaleFactor = rawMagnitude > maxFrictionForce ? (maxFrictionForce / (rawMagnitude + 1e-6)) : 1;
      const longitudinalForce = longitudinalForceRaw * scaleFactor;
      const lateralForce = lateralForceRaw * scaleFactor;

      // 6. Apply forces to the car
      const forceWorld = add(scale(forwardVector, longitudinalForce), scale(sideVector, lateralForce));
      perWheelForceWorld[i] = forceWorld;
      totalForceWorld = add(totalForceWorld, forceWorld);
      totalYawMoment += contactPointWorld.x * forceWorld.y - contactPointWorld.y * forceWorld.x;

      // 7. Apply reaction torque to the wheel
      const tireReactionTorque = -longitudinalForce * car.wheelRadius;
      const wheelBrakeTorque = brakeTorquePerWheel + (i >= 2 ? handbrakeExtraRearTorque : 0);
      const netWheelTorque = engineTorquePerWheel - wheelBrakeTorque + tireReactionTorque;
      wheels[i].angularSpeed += (netWheelTorque / wheelInertia) * dt;
    }

    const linearAcceleration = scale(totalForceWorld, 1 / Math.max(1e-3, car.mass));
    const newVelocity = add(car.velocity, scale(linearAcceleration, dt));
    const yawInertia = car.mass * safeWheelbase * safeWheelbase / 12;
    const newAngularVelocity = car.angularVelocity + (totalYawMoment / Math.max(1e-3, yawInertia)) * dt;
    const newOrientation = car.orientation + newAngularVelocity * dt;
    const newPosition = add(car.position, scale(newVelocity, dt));

    return {
      ...car,
      position: newPosition,
      orientation: newOrientation,
      velocity: newVelocity,
      angularVelocity: newAngularVelocity,
      frontWheelAngle: frontSteeringAngle,
      omegaFL: wheels[0].angularSpeed, omegaFR: wheels[1].angularSpeed, omegaRL: wheels[2].angularSpeed, omegaRR: wheels[3].angularSpeed,
      slipLongFL: perWheelSlipLongitudinal[0], slipLongFR: perWheelSlipLongitudinal[1], slipLongRL: perWheelSlipLongitudinal[2], slipLongRR: perWheelSlipLongitudinal[3],
      slipLatFL:  perWheelSlipLateral[0],     slipLatFR:  perWheelSlipLateral[1],     slipLatRL:  perWheelSlipLateral[2],     slipLatRR:  perWheelSlipLateral[3],
      forceFL: perWheelForceWorld[0],
      forceFR: perWheelForceWorld[1],
      forceRL: perWheelForceWorld[2],
      forceRR: perWheelForceWorld[3],
    };
  }
}