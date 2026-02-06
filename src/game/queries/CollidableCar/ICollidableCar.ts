import { ICarState } from "@/game/queries/WithCarPhysics/ICarState";
import { Damageable } from "@/game/state/components/Damageable";
import { Identifiable } from "@/game/state/components/Identifiable";
import { Physical } from "@/game/state/components/Physical";

export interface ICollidableCar extends ICarState, Damageable, Identifiable, Physical {}
