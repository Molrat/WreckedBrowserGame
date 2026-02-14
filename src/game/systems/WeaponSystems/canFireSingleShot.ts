import { IPlayer } from "@/game/queries/Player/IPlayer";

export function canFireSingleShot(player: IPlayer): boolean {
  return player.currentGamepad.cross && !player.previousGamepad.cross;
}
