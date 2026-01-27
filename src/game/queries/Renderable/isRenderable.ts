import type { Identifiable } from '../../state/components/Identifiable';
import { IRenderable } from './IRenderable';

export function isRenderable(e: Identifiable): e is Identifiable & IRenderable {
  return 'shape' in e && 'position' in e && 'orientation' in e && 'fillColor' in e;
}
