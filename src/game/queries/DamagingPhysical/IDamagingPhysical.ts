import { Physical } from "@/game/state/components/Physical";
import { Damaging } from "@/game/state/components/Damaging";

export interface IDamagingPhysical extends Physical, Damaging {}
