import { Physical } from "@/game/state/components/Physical";
import { Mountable } from "@/game/state/components/Mountable";

export interface IMountablePhysical extends Physical, Mountable {}
