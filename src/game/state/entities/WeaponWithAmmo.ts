import { Identifiable } from "@/game/state/components/Identifiable";
import { Physical } from "@/game/state/components/Physical";
import { Mountable } from "@/game/state/components/Mountable";
import { WithAmmo } from "@/game/state/components/WithAmmo";

export type WeaponWithAmmo = Identifiable & Physical & Mountable & WithAmmo;
