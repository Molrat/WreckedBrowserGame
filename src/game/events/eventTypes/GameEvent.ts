import { Vector2 } from "@/math/Vector2";

export type GameEvent =
	| { type: 'StartMenuPlayerJoined'; slot: number }
	| { type: 'StartMenuPlayerReady'; slot: number }
	| { type: 'PlayerDied'; playerId: string; placement: number; position: Vector2; color: string }
	| { type: 'OutOfAmmo'; position: Vector2; color: string }
	| { type: 'HitByProjectile'; position: Vector2; color: string; damage: number };