import { Identifiable } from "@/game/state/components/Identifiable";
import { ICollidableCar } from "./ICollidableCar";

export function isCollidableCar(e: Identifiable): e is Identifiable & ICollidableCar {
  return 'position' in e && 'angularVelocity' in e && 'throttle' in e && 'health' in e && 'shape' in e;
}
