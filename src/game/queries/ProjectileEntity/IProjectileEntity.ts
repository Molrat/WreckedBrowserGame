import { Identifiable } from "@/game/state/components/Identifiable";
import { Physical } from "@/game/state/components/Physical";

export interface IProjectileEntity extends Identifiable, Physical {
  lifetime: number;
  maxLifetime: number;
  fades: boolean;
}
