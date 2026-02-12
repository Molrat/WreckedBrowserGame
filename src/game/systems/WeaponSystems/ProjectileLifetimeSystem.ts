import { ISystem } from "@/game/systems/ISystem";
import { GameState } from "@/game/state/GameState";
import { EventBus } from "@/game/events/EventBus";
import { isProjectileEntity } from "@/game/queries/ProjectileEntity/isProjectileEntity";
import { IProjectileEntity } from "@/game/queries/ProjectileEntity/IProjectileEntity";

export class ProjectileLifetimeSystem implements ISystem {
  update(state: GameState, _eventBus: EventBus, dt: number): void {
    if (state.ui.openMenu !== null) return;
    const projectiles = state.entities.filter(isProjectileEntity);
    const toRemove: string[] = [];

    for (const proj of projectiles) {
      proj.lifetime -= dt;
      if (proj.lifetime <= 0) {
        toRemove.push(proj.id);
        continue;
      }
      if (proj.fades) this.updateAlpha(proj);
    }

    if (toRemove.length > 0) {
      state.entities = state.entities.filter(e => !toRemove.includes(e.id));
    }
  }

  private updateAlpha(proj: IProjectileEntity): void {
    const alpha = Math.max(0, proj.lifetime / proj.maxLifetime);
    if (proj.fillColor && proj.fillColor.startsWith('rgba')) {
      proj.fillColor = proj.fillColor.replace(/[\d.]+\)$/, `${alpha})`);
      return;
    }
    if (proj.fillColor && proj.fillColor.startsWith('#') && proj.fillColor.length === 7) {
      const r = parseInt(proj.fillColor.slice(1, 3), 16);
      const g = parseInt(proj.fillColor.slice(3, 5), 16);
      const b = parseInt(proj.fillColor.slice(5, 7), 16);
      proj.fillColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }
}
