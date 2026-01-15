export type GameEvent =
	| { type: 'StartMenuPlayerJoined'; slot: number }
	| { type: 'StartMenuPlayerReady'; slot: number };