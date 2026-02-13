import { IMountablePhysical } from "@/game/queries/MountablePhysical/IMountablePhysical";
import { WithAmmo } from "@/game/state/components/WithAmmo";
import { SpawnPlatformTracked } from "@/game/state/components/SpawnPlatformTracked";

export interface IWeapon extends IMountablePhysical, WithAmmo, SpawnPlatformTracked {}
