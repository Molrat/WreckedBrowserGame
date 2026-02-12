import { IMountablePhysical } from "@/game/queries/MountablePhysical/IMountablePhysical";
import { WithAmmo } from "@/game/state/components/WithAmmo";

export interface IWeapon extends IMountablePhysical, WithAmmo {}
