// Visual animation state - not part of GameState (purely visual)
export type EffectsState = {
	joinEffects?: {
		slot: number;
		startTime: number;
		duration: number;
	}[];
	readyEffects?: {
		slot: number;
		startTime: number;
		duration: number;
	}[];
};

