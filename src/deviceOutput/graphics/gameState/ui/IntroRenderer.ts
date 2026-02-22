import { IScreenRenderer } from "@/deviceOutput/graphics/IScreenRenderer";
import type { GameState } from "@/game/state/GameState";
import type { IScreenRenderAPI } from "@/deviceOutput/graphics/common/IScreenRenderAPI";
import type { LinkRect } from "@/deviceOutput/graphics/common/LinkRect";
import { LinkDrawer } from "@/deviceOutput/graphics/common/LinkDrawer";
import { NeonTextDrawer } from "@/deviceOutput/graphics/common/NeonTextDrawer";
import musicContributions from "@/assets/music/music_contributions.json";

const LINK_FONT = 'bold 14px Arial, sans-serif';
const LINK_COLOR = '#6666ff';
const ATTRIBUTION_FONT = 'bold 18px Arial, sans-serif';

type ClickableLink = { rect: LinkRect; url: string };

export class IntroRenderer implements IScreenRenderer {
  private links: ClickableLink[] = [];
  private isIntroOpen = false;

  constructor() {
    window.addEventListener('click', (e) => {
      if (!this.isIntroOpen) return;
      const hit = this.links.find(l => LinkDrawer.isInside(l.rect, e.clientX, e.clientY));
      if (hit) window.open(hit.url, '_blank');
    });
  }

  render(gameState: GameState, draw: IScreenRenderAPI): void {
    this.isIntroOpen = gameState.ui.openMenu === 'intro';
    if (!this.isIntroOpen) return;

    const width = draw.getWidth();
    const height = draw.getHeight();
    draw.clear();
    draw.fillBackground('#0a0a14');

    NeonTextDrawer.drawNeonText(draw, 'NEON-STRIKE', width / 2, height * 0.3, '#ffffff', '#00ffff', 'bold 80px Arial, sans-serif');
    NeonTextDrawer.drawNeonText(draw, 'CARMAGEDDON', width / 2, height * 0.3 + 90, '#ffffff', '#ff00ff', 'bold 40px Arial, sans-serif');

    const blinkValue = Math.sin(gameState.time.total * 2);
    if (blinkValue > 0) {
      NeonTextDrawer.drawNeonText(draw, 'PRESS ANY BUTTON TO CONTINUE', width / 2, height * 0.5, '#ffffff', '#ff00ff', 'bold 24px Arial, sans-serif');
    }

    this.links = [];
    this.renderAttribution(draw, width, height);
    this.renderContributeLink(draw, width, height);
    this.renderMusicCredits(draw, width, height);
  }

  private renderAttribution(draw: IScreenRenderAPI, width: number, height: number): void {
    const rect = draw.drawLink('Made by Sharp Lines Developments', width / 2, height * 0.6, LINK_COLOR, ATTRIBUTION_FONT);
    this.links.push({ rect, url: 'https://sharplines.nl' });
  }

  private renderContributeLink(draw: IScreenRenderAPI, width: number, height: number): void {
    const rect = draw.drawLink('Click here to help develop this open sourced game!', width / 2, height * 0.65, LINK_COLOR, LINK_FONT);
    this.links.push({ rect, url: 'https://github.com/Molrat/WreckedBrowserGame' });
  }

  private renderMusicCredits(draw: IScreenRenderAPI, width: number, height: number): void {
    const startY = height * 0.72;
    const lineHeight = 40;
    NeonTextDrawer.drawNeonText(draw, 'MUSIC', width / 2, startY, '#ffffff', '#00ffff', 'bold 16px Arial, sans-serif');

    musicContributions.songs.forEach((song, i) => {
      const y = startY + (i + 1) * lineHeight;
      const text = `${song.name} — ${song.artist}`;
      const rect = draw.drawLink(text, width / 2, y, LINK_COLOR, LINK_FONT);
      this.links.push({ rect, url: song.url });
    });
  }
}
