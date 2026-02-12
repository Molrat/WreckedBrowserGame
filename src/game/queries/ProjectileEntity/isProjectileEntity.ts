import { Identifiable } from "@/game/state/components/Identifiable";
import { IProjectileEntity } from "./IProjectileEntity";

export function isProjectileEntity(
  e: Identifiable
): e is Identifiable & IProjectileEntity {
  return (
    'lifetime' in e &&
    'maxLifetime' in e &&
    'damage' in e &&
    'shape' in e &&
    'position' in e
  );
}
