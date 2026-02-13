import { GameState } from "@/game/state/GameState";
import { Vector2 } from "@/math/Vector2";
import { createLaserCannon } from "@/game/state/entities/Factories/LaserCannonFactory";

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
    state.entities.push(createLaserCannon(pos, spawnPlatformIndex));
  }
}
