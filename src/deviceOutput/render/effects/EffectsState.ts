// Visual animation state - not part of GameState (purely visual)
export type EffectsState = {
	joinEffects?: {
		slot: number;
		startTime: number;
		duration: number;
		x: number;
		y: number;
		width: number;
		height: number;
	}[];
	readyEffects?: {
		slot: number;
		startTime: number;
		duration: number;
		x: number;
		y: number;
		width: number;
		height: number;
	}[];
};

