import { Identifiable } from "@/game/state/components/Identifiable";
import { ITextable } from "./ITextable";

export function isTextable(e: Identifiable): e is Identifiable & ITextable {
  return 'text' in e && 'textOffset' in e && 'textSize' in e && 'textDepth' in e && 'position' in e;
}
