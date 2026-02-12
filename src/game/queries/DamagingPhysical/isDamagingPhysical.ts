import { Identifiable } from "@/game/state/components/Identifiable";
import { IDamagingPhysical } from "./IDamagingPhysical";

export function isDamagingPhysical(
  e: Identifiable
): e is Identifiable & IDamagingPhysical {
  return (
    'damage' in e &&
    'ownerPlayerId' in e &&
    'impulseMagnitude' in e &&
    'shape' in e &&
    'position' in e
  );
}
