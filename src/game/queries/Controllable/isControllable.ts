import { Identifiable } from "../../state/components/Identifiable";
import { IControllable } from "./IControllable";

export function isControllable(e: Identifiable): e is Identifiable & IControllable {
  return 'controllerId' in e;
}
