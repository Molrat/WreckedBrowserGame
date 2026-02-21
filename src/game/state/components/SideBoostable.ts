export type SideBoostable = {
  sideBoostCooldown: number;       // seconds remaining until next boost
  sideBoostCooldownMax: number;    // total cooldown duration (seconds)
  sideBoostImpulse: number;        // impulse magnitude (N·s)
};
