import { IPlayer } from "@/game/queries/Player/IPlayer";

export function canFireAutomatic(player: IPlayer): boolean {
  return player.currentGamepad.cross;
}
