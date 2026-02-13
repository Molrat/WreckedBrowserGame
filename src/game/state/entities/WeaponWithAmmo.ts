import { Identifiable } from "@/game/state/components/Identifiable";
import { Physical } from "@/game/state/components/Physical";
import { Mountable } from "@/game/state/components/Mountable";
import { WithAmmo } from "@/game/state/components/WithAmmo";
import { SpawnPlatformTracked } from "@/game/state/components/SpawnPlatformTracked";
import { Movable } from "../components/Movable";

export type WeaponWithAmmo = Identifiable & Physical & Movable & Mountable & WithAmmo & SpawnPlatformTracked;
