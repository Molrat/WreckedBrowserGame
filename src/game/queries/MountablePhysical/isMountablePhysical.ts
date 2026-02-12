import { Identifiable } from "@/game/state/components/Identifiable";
import { IMountablePhysical } from "./IMountablePhysical";

export function isMountablePhysical(
  e: Identifiable
): e is Identifiable & IMountablePhysical {
  return (
    'mountedOnPlayerId' in e &&
    'relativePosition' in e &&
    'shape' in e &&
    'position' in e
  );
}
