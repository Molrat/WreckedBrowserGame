import { Identifiable } from "@/game/state/components/Identifiable";
import { IDamageableMovable } from "./IDamageableMovable";

export function isDamageableMovable(
  e: Identifiable
): e is Identifiable & IDamageableMovable {
  return (
    'health' in e &&
    'shape' in e &&
    'position' in e &&
    'velocity' in e &&
    'impulses' in e
  );
}
