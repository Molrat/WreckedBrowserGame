export type StartMenuState = {
    playerConnections: PlayerConnectionState[];
}

export type PlayerConnectionState = {
    status: 'notJoined' | 'joined' | 'ready';
    controllerId?: string | null;
}