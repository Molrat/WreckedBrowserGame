import { Identifiable } from "@/game/state/components/Identifiable";
import { WithLifeSpan } from "@/game/state/components/WithLifeSpan";

export interface ILifeSpanParams extends Identifiable, WithLifeSpan {
  fillColor: string;
}
