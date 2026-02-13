import { PacejkaCoefficients } from "../systems/CarSystems/drivingPhysicsSystem/drivingPhysicsComputer/wheelForce/PacejkaCoefficients";
import { CollisionConfig } from "../systems/CarSystems/carCollisionSystem/simpleCollisionComputer/SimpleCarCollisionComputer";

export const CAR_PHYSICS = {
  mass: 1000,
  momentOfInertiaRelativeToMass: 2,       // kg·m² (box approximation)
  lengthToFrontAxle: 1.25,    // m from center
  lengthToRearAxle: 1.25,     // m from center
  trackHalfWidth: 0.75,       // m (half of the distance between left and right wheels)
  wheelRadius: 0.3,           // m
  maxSteeringAngle: Math.PI / 6, // rad (30°)

  engineForce: 9000,           // N (AWD)
  brakeForce: 10000,           // N
  tireStiffness: 200000,       // 
  tireMu: 3,                 // friction coefficient
  airDragCoefficient: 3.0,     // used with v² - gives ~200 km/h top speed
};

export const COLLISION_CONFIG: CollisionConfig = {
  restitution: 0.3,           // 0 = inelastic, 1 = elastic (0.3 = some energy loss)
  friction: 0.6,              // tangential friction at contact point (produces spin)
  damagePerMps: 0.1,          // damage per m/s relative velocity
};

export const PACEJKA_LONGITUDINAL: PacejkaCoefficients = {
  B: 8,    // Stiffness factor
  C: 1.9,  // Shape factor
  E: 0.97, // Curvature factor
};

export const PACEJKA_LATERAL: PacejkaCoefficients = {
  B: 20,    // Stiffness factor
  C: 1.1,  // Shape factor
  E: 0.8,  // Curvature factor
};
