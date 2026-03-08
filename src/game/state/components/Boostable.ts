export type Boostable = {
  boostCooldown: number;       // seconds remaining until next boost
  boostCooldownMax: number;    // total cooldown duration (seconds)
  boostImpulse: number;        // impulse magnitude (N·s)
};
