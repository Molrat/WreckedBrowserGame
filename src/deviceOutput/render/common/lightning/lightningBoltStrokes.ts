export type LightningStroke = {
  color: string;
  width: number;
};

export function lightningBoltStrokes(segWidth: number, alpha: number): LightningStroke[] {
  return [
    { color: `rgba(100, 140, 255, ${alpha * 0.15})`, width: segWidth * 8 },
    { color: `rgba(130, 170, 255, ${alpha * 0.3})`,  width: segWidth * 4 },
    { color: `rgba(180, 200, 255, ${alpha * 0.5})`,  width: segWidth * 2 },
    { color: `rgba(220, 230, 255, ${alpha * 0.9})`,  width: segWidth },
    { color: `rgba(255, 255, 255, ${alpha})`,         width: segWidth * 0.5 },
  ];
}
