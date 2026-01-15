import { Identifiable } from "../../state/components/Identifiable";
import { IControllable } from "../Controllable/IControllable";
import { isControllable } from "../Controllable/isControllable";
import { isDrivable } from "../Drivable/isAcceleratable";
import { IDrivable } from "../Drivable/IDrivable";

export function isControllableAndDrivable(e: Identifiable): e is Identifiable & IControllable & IDrivable {
  return isControllable(e) && isDrivable(e);
}