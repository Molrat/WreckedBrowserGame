export type Scorable = {
  score: number;
  roundScores: number[];  // Score per round
  placement: number;      // Current round placement (0 = still alive)
};
