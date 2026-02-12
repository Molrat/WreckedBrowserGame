import { Identifiable } from "@/game/state/components/Identifiable";
import { IArmedWeapon } from "./IArmedWeapon";

export function isArmedWeapon(
  e: Identifiable
): e is Identifiable & IArmedWeapon {
  return (
    'mountedOnPlayerId' in e &&
    'relativePosition' in e &&
    'currentAmmo' in e &&
    'projectileType' in e &&
    'shape' in e &&
    'position' in e
  );
}
