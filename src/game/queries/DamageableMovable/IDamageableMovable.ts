import { Damageable } from "@/game/state/components/Damageable";
import { Physical } from "@/game/state/components/Physical";
import { Movable } from "@/game/state/components/Movable";
import { Identifiable } from "@/game/state/components/Identifiable";

export interface IDamageableMovable
  extends Identifiable, Damageable, Physical, Movable {}
