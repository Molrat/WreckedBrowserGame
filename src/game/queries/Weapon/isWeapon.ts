import { Identifiable } from "@/game/state/components/Identifiable";
import { IWeapon } from "./IWeapon";

export function isWeapon(
  e: Identifiable
): e is Identifiable & IWeapon {
  return (
    'mountedOnPlayerId' in e &&
    'relativePosition' in e &&
    'currentAmmo' in e &&
    'projectileType' in e &&
    'shape' in e &&
    'position' in e &&
    'spawnPlatformIndex' in e
  );
}
