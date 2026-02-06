import { PacejkaCoefficients } from "../systems/CarSystems/carPhysicsSystem/carPhysicsComputer/wheelForce/PacejkaCoefficients";

export const CAR_PHYSICS = {
  engineForce: 9000,           // N (AWD)
  brakeForce: 10000,           // N
  tireStiffness: 200000,       // N/m
  tireMu: 1.5,                 // friction coefficient
  rollingResistance: 800,      // N
  airDragCoefficient: 3.0,     // used with v² - gives ~200 km/h top speed
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
