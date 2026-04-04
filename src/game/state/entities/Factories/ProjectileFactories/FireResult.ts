import { Projectile } from "@/game/state/entities/Projectile";

type FireResult = {
    projectile: Projectile;
    recoil: number;
};

export type { FireResult };
