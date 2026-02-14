import { Physical } from "@/game/state/components/Physical";
import { Damaging } from "@/game/state/components/Damaging";
import { Movable } from "@/game/state/components/Movable";

export interface IDamagingPhysical extends Physical, Damaging, Movable {}
