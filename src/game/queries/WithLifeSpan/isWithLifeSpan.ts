import { Identifiable } from "@/game/state/components/Identifiable";
import { ILifeSpanParams } from "./ILifeSpanParams";

export function isWithLifeSpan(
  e: Identifiable
): e is Identifiable & ILifeSpanParams {
  return (
    'lifetime' in e &&
    'maxLifetime' in e &&
    'fillColor' in e
  );
}
