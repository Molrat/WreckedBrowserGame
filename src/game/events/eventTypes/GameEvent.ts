import { Vector2 } from "@/math/Vector2";

export type GameEvent =
	| { type: 'StartMenuPlayerJoined'; slot: number }
	| { type: 'StartMenuPlayerReady'; slot: number }
	| { type: 'PlayerDied'; playerId: string; placement: number; position: Vector2; color: string }
	| { type: 'WeaponFired'; position: Vector2; color: string };