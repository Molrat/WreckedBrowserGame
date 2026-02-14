import { GameState } from "@/game/state/GameState";
import { Vector2 } from "@/math/Vector2";
import { WeaponWithAmmo } from "@/game/state/entities/WeaponWithAmmo";
import { createLaserCannon } from "@/game/state/entities/Factories/WeaponFactories/LaserCannonFactory";
import { createMachineGun } from "@/game/state/entities/Factories/WeaponFactories/MachineGunFactory";

type WeaponCreator = (pos: Vector2, spawnPlatformIndex: number) => WeaponWithAmmo;
const WEAPON_CREATORS: WeaponCreator[] = [createLaserCannon, createMachineGun];

const WEAPON_COUNT = 4;
const WEAPON_SPACING = 6;

export function spawnWeaponRow(
  state: GameState,
  center: Vector2,
  direction: Vector2,
  spawnPlatformIndex: number
): void {
  const totalLength = WEAPON_SPACING * (WEAPON_COUNT - 1);
  const startOffset = -totalLength / 2;

  for (let j = 0; j < WEAPON_COUNT; j++) {
    const t = startOffset + j * WEAPON_SPACING;
    const pos = {
      x: center.x + direction.x * t,
      y: center.y + direction.y * t,
    };
    const create = WEAPON_CREATORS[Math.floor(Math.random() * WEAPON_CREATORS.length)];
    state.entities.push(create(pos, spawnPlatformIndex));
  }
}
