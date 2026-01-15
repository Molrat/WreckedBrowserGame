import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { clamp } from "@/math/numberFunctions";
import { Vector2, add, length, scale } from "@/math/Vector2";

export class CarPhysicsComputer {
  compute(car: ICarState, deltaT: number): ICarState{
  const forward: Vector2 = { x: Math.cos(car.orientation), y: Math.sin(car.orientation) };
  const right: Vector2 = { x: -forward.y, y: forward.x };

  // 2️⃣ Longitudinal speed in car space
  const localVelX = car.velocity.x * forward.x + car.velocity.y * forward.y;
  const localVelY = car.velocity.x * right.x + car.velocity.y * right.y;

  // 3️⃣ Tire grip multipliers
  const rearGrip = car.tireGripRear * (car.handBrake > 0 ? car.driftGripMultiplier : 1);
  const frontGrip = car.tireGripFront;

  // 4️⃣ Steering: compute desired front wheel velocity direction
  const steerAngle = clamp(car.wheelAngle, -car.maxSteeringAngle, car.maxSteeringAngle);
  const turningRadius = car.wheelBase / Math.tan(steerAngle || 0.0001);

  // 5️⃣ Compute longitudinal and lateral forces
  const engineForce = car.throttle * car.engineForce;
  const brakeForce = car.brake * car.brakeForce;

  // Resistances
  const rollingResistanceForce = car.rollingResistance * length(car.velocity);
  const airDragForce = car.airDragCoefficient * length(car.velocity) ** 2;

  // Longitudinal net force
  const netLongitudinalForce = engineForce - brakeForce - rollingResistanceForce - airDragForce;

  // Acceleration (a = F/m)
  const acceleration = netLongitudinalForce / car.mass;

  // 6️⃣ Lateral dynamics (simplified)
  const lateralForce = -localVelY * rearGrip;

  // 7️⃣ Update local velocity
  const newLocalVelX = localVelX + acceleration * deltaT;
  const newLocalVelY = localVelY + lateralForce / car.mass * deltaT;

  // 8️⃣ Convert back to world velocity
  const newVelocity: Vector2 = add(
    scale(forward, newLocalVelX),
    scale(right, newLocalVelY)
  );

  // 9️⃣ Angular velocity (yaw)
  const yawTorque = (newLocalVelY * car.mass * car.centerOfMassOffset) / car.wheelBase;
  const angularAcceleration = yawTorque / car.inertia;
  const newAngularVelocity = car.angularVelocity + angularAcceleration * deltaT;

  // 10️⃣ Update position and orientation
  const newPosition = add(car.position, scale(newVelocity, deltaT));
  const newOrientation = car.orientation + newAngularVelocity * deltaT;

  // 11️⃣ Return updated car
  return {
    ...car,
    position: newPosition,
    orientation: newOrientation,
    velocity: newVelocity,
    angularVelocity: newAngularVelocity,
  };
}