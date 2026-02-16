import { Vector2 } from "@/math/Vector2";
import { ProjectileType } from "@/game/state/components/ProjectileType";

export type GameEvent =
	| { type: 'StartMenuPlayerJoined'; slot: number }
	| { type: 'StartMenuPlayerReady'; slot: number }
	| { type: 'PlayerDied'; playerId: string; placement: number; position: Vector2; color: string }
	| { type: 'OutOfAmmo'; position: Vector2; color: string }
	| { type: 'ProjectileFired'; projectileType: ProjectileType; position: Vector2 }
	| { type: 'HitByProjectile'; projectileType: ProjectileType; position: Vector2; color: string; damage: number }
	| { type: 'CarCollision'; position: Vector2; impulseMagnitude: number }
	| { type: 'WeaponPickup'; position: Vector2 }
	| { type: 'CountdownTick'; step: number };