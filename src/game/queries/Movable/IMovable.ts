import { Vector2 } from "../../../math/Vector2";
import type { AppliedForce } from "@/game/state/components/physics/AppliedForce";
import type { AppliedImpulse } from "@/game/state/components/physics/AppliedImpulse";

export interface IMovable {
    position: Vector2;
    velocity: Vector2;
    orientation: number;
    angularVelocity: number;
    mass: number;
    momentOfInertia: number;
    forces: AppliedForce[];
    impulses: AppliedImpulse[];
}