import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { Vector2, add, scale, rotate } from "@/math/Vector2";
import { ICarPhysicsComputer } from "./ICarPhysicsComputer";

export class CarPhysicsComputer implements ICarPhysicsComputer {
  compute(car: ICarState, dt: number): ICarState {
    // Standard math: 0° = +X (right), 90° = +Y (up), counterclockwise positive
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
    // Forward = +X, Left = +Y, Right = -Y (standard math convention)
    const wheels = [
      { localPosition: { x: +car.lengthToFrontAxle, y: +car.trackHalfWidth }, steeringAngle: frontSteeringAngle, angularSpeed: car.omegaFL },
      { localPosition: { x: +car.lengthToFrontAxle, y: -car.trackHalfWidth }, steeringAngle: frontSteeringAngle, angularSpeed: car.omegaFR },
      { localPosition: { x: -car.lengthToRearAxle,  y: +car.trackHalfWidth }, steeringAngle: 0,                    angularSpeed: car.omegaRL },
      { localPosition: { x: -car.lengthToRearAxle,  y: -car.trackHalfWidth }, steeringAngle: 0,                    angularSpeed: car.omegaRR },
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
    const wheelInertia = 0.7 * 10 * car.wheelRadius * car.wheelRadius;

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

      // 3. Compute normalized slip values
      const wheelSurfaceSpeed =
        wheels[i].angularSpeed * car.wheelRadius;
      // Longitudinal slip ratio: dimensionless, ranges from -1 (locked) to +∞ (spinning)

      const slipRatio =
        (wheelSurfaceSpeed - forwardSpeed) /
        Math.max(Math.abs(forwardSpeed), Math.abs(wheelSurfaceSpeed), 0.5);
      
      // Lateral slip angle: radians, speed-independent measure of sideways slip
      // slipAngle = atan2(sideSpeed, |forwardSpeed|)
      const refSpeedLat = Math.max(Math.abs(forwardSpeed), 2);
      const slipAngle = Math.atan2(sideSpeed, refSpeedLat);

      // 4. Nonlinear tire force model with normalized S-curves
      // Parameters for slip curve shape
      const tireGripBuildUp = car.tireGripBuildUp * gripFactors[i];  // longitudinal curve steepness
      const tireGripDropOff = car.tireGripDropOff;                    // longitudinal falloff factor
      const tireGripBuildUpLat = tireGripBuildUp * car.tireGripBuildUpLatScalar;  // lateral curve steepness
      const tireGripDropOffLat = tireGripDropOff * car.tireGripDropOffLatScalar;  // lateral falloff factor
      const maxGripLatScalar = car.maxGripLatScalar;  // lateral grip multiplier (>1 = more cornering than traction grip)

      // S-curve shape function: rises then falls with normalized slip input
      // S_raw(s) = (1 - exp(-k*s)) * exp(-alpha*k*s)
      const shapeFunction = (slip: number, stiffness: number, alpha: number): number => {
        const s = Math.abs(slip);
        return (1 - Math.exp(-stiffness * s)) * Math.exp(-alpha * stiffness * s);
      };

      // Precompute normalized peak (analytical maximum of shape function)
      // Peak occurs at s* = ln(1 + 1/alpha) / (stiffness * (1 + alpha))
      const computeShapeMax = (stiffness: number, alpha: number): number => {
        const sPeak = Math.log(1 + 1 / alpha) / (stiffness);
        return shapeFunction(sPeak, stiffness, alpha);
      };
      const sxMax = computeShapeMax(tireGripBuildUp, tireGripDropOff);
      const syMax = computeShapeMax(tireGripBuildUpLat, tireGripDropOffLat);

      // Normalized shape values (0 to 1) using absolute and clamped slip ratio and slip angle
      const slipRatioAbs= Math.min(Math.abs(slipRatio), 1);
      const slipAngleAbs = Math.min(Math.abs(slipAngle), 1);
      // Store for debugging/visualization
      perWheelSlipLongitudinal[i] = slipRatioAbs;
      perWheelSlipLateral[i] = slipAngleAbs;

      const sxNorm = shapeFunction(slipRatioAbs, tireGripBuildUp, tireGripDropOff) / sxMax;
      const syNorm = shapeFunction(slipAngleAbs, tireGripBuildUpLat, tireGripDropOffLat) / syMax;

      // Raw forces from normalized slip curves
      // Force = mu * normalForce * normalizedShape (with betaLat boost for lateral)
      const mu = car.tireMu;
      const Nf = normalForces[i];
      const fxPeak = mu * Nf;                         // max longitudinal force
      const fyPeak = mu * Nf * maxGripLatScalar;      // max lateral force (with grip boost)
      
      // Apply sign based on slip direction (force opposes slip)
      // Positive slipRatio = wheel spinning faster than ground = force pushes car forward
      // Positive slipAngle = car sliding left = force pushes car right
      const longitudinalForceRaw = Math.sign(slipRatio) * fxPeak * sxNorm;
      const lateralForceRaw = -Math.sign(slipAngle) * fyPeak * syNorm;

      // 5. Friction ellipse: combined forces must lie within ellipse
      // Ellipse equation: (Fx/fxPeak)^2 + (Fy/fyPeak)^2 <= 1
      let longitudinalForce = longitudinalForceRaw;
      let lateralForce = lateralForceRaw;

      const ellipseRadius = Math.sqrt(
        (longitudinalForceRaw / fxPeak) ** 2 + 
        (lateralForceRaw / fyPeak) ** 2
      );
      if (ellipseRadius > 1) {
        // Scale both forces equally to bring onto ellipse boundary
        longitudinalForce = longitudinalForceRaw / ellipseRadius;
        lateralForce = lateralForceRaw / ellipseRadius;
      }

      // 6. Apply forces to the car
      const forceWorld = add(scale(forwardVector, longitudinalForce), scale(sideVector, lateralForce));
      perWheelForceWorld[i] = forceWorld;
      totalForceWorld = add(totalForceWorld, forceWorld);
      totalYawMoment += contactPointWorld.x * forceWorld.y - contactPointWorld.y * forceWorld.x;

      // 7. Apply reaction torque to the wheel
      // When tire pushes car forward (positive force), reaction slows wheel (negative torque)
      const tireReactionTorque = -longitudinalForce * car.wheelRadius;
      const wheelBrakeTorque = brakeTorquePerWheel + (i >= 2 ? handbrakeExtraRearTorque : 0);
      // Rolling resistance torque (always opposes wheel rotation)
      const rollingResistanceTorque = -Math.sign(wheels[i].angularSpeed) * car.rollingResistance * car.wheelRadius * 0.25;
      const viscousTorque = -1.0 * wheels[i].angularSpeed;
      const netWheelTorque = engineTorquePerWheel - wheelBrakeTorque + tireReactionTorque + rollingResistanceTorque + viscousTorque;
      wheels[i].angularSpeed += (netWheelTorque / wheelInertia) * dt;
      
      // Prevent wheel from reversing due to braking/resistance when nearly stopped
      if (Math.abs(wheels[i].angularSpeed) < 0.1 && engineTorquePerWheel === 0) {
        wheels[i].angularSpeed = 0;
      }
    }

    // Apply air drag: F = -Cd * v² * direction
    // Drag increases when drifting (larger frontal area when sideways)
    const speed = Math.hypot(car.velocity.x, car.velocity.y);
    let effectiveDragCoeff = car.airDragCoefficient;
    if (speed > 0.1) {
      const carForward = direction(car.orientation);
      const velocityDir: Vector2 = { x: car.velocity.x / speed, y: car.velocity.y / speed };
      const alignmentCos = Math.abs(dotProduct(carForward, velocityDir)); // 1 = straight, 0 = fully sideways
      // Sideways drag is ~2.5x frontal drag (car is wider than long from drag perspective)
      const sidewaysDragMultiplier = 2.5;
      effectiveDragCoeff = car.airDragCoefficient * (alignmentCos + sidewaysDragMultiplier * (1 - alignmentCos));
    }
    const dragMagnitude = effectiveDragCoeff * speed * speed;
    const dragForce: Vector2 = speed > 0.01 
      ? scale(car.velocity, -dragMagnitude / speed)
      : { x: 0, y: 0 };
    totalForceWorld = add(totalForceWorld, dragForce);

    const linearAcceleration = scale(totalForceWorld, 1 / car.mass);
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
      slipRatioFL: perWheelSlipLongitudinal[0], slipRatioFR: perWheelSlipLongitudinal[1], slipRatioRL: perWheelSlipLongitudinal[2], slipRatioRR: perWheelSlipLongitudinal[3],
      slipAngleFL:  perWheelSlipLateral[0],     slipAngleFR:  perWheelSlipLateral[1],     slipAngleRL:  perWheelSlipLateral[2],     slipAngleRR:  perWheelSlipLateral[3],
      forceFL: perWheelForceWorld[0],
      forceFR: perWheelForceWorld[1],
      forceRL: perWheelForceWorld[2],
      forceRR: perWheelForceWorld[3],
    };
  }
}