import { EventBus } from "../../events/EventBus";
import { PlayerFactory } from "../../state/entities/Factories/PlayerFactory";
import { GameState } from "../../state/GameState";
import { PlayerConnectionState } from "../../state/ui/StartMenuState";
import { ISystem } from "../ISystem";

export class StartMenuSystem implements ISystem {

    update(state: GameState, eventBus: EventBus, dt: number): void{
        if (state.ui.openMenu != 'start') 
        { 
            return; 
        }
        if (state.input.gamePads.length != state.input.previousGamepads.length) 
        {
            return;
        }

        // Calculate layout dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;
        const rows = 2;
        const cols = state.ui.startMenu.playerConnections.length / rows;
        const pad = 20;
        const rectW = (width - pad * (cols + 1)) / cols;
        const rectH = (height - pad * (rows + 1) - 130) / rows;

        const s = state.ui.startMenu;
        const connections = s.playerConnections;

        // Edge-detect Cross/Triangle by controller index in pads, assign slots by join order
        state.input.gamePads.forEach((controller, index) => {
            // Find slot for this controller index-based id, if any
            let slot = connections.findIndex(pc => pc.controllerId === controller.id);
            if (slot === -1) {
                const previousCross = state.input.previousGamepads[index]?.cross || false;
                 if (controller.cross && !previousCross) {
                    this.connectPlayer(connections, controller.id, eventBus, rectW, rectH);
                }
            }
            // If found, check for ready
            else{
                if (connections[slot].status === 'joined') {
                    const previousTriangle = state.input.previousGamepads[index]?.triangle || false;
                    if (controller.triangle && !previousTriangle) {
                        this.readyPlayer(connections[slot], slot, eventBus, rectW, rectH);
                    }
                }
            }
        });

        const allReady = this.checkAllReady(connections);
        if (allReady) {
            connections.forEach( pc => {
                if (pc.status === 'ready' && pc.controllerId) {
                state.entities.push(...PlayerFactory.createWithWheels(pc.controllerId));
                }
            });
            state.ui.openMenu = null;
        }
    }

    private connectPlayer(connections: PlayerConnectionState[], controllerId: string, eventBus: EventBus, rectW: number, rectH: number){
        const foundSlot = connections.findIndex(pc => pc.status === 'notJoined');
        connections[foundSlot] = { status: 'joined', controllerId: controllerId };
        const col = foundSlot % Math.ceil(connections.length / 2);
        const row = Math.floor(foundSlot / Math.ceil(connections.length / 2));
        const pad = 20;
        const x = pad + col * (rectW + pad);
        const y = 130 + pad + row * (rectH + pad);
        eventBus.emit({ type: 'StartMenuPlayerJoined', slot: foundSlot, x, y, width: rectW, height: rectH });
    }

    private readyPlayer(slot: PlayerConnectionState, slotIndex: number, eventBus: EventBus, rectW: number, rectH: number){
        slot.status = 'ready';
        const cols = Math.ceil(4); // 8 players / 2 rows = 4 cols
        const row = Math.floor(slotIndex / cols);
        const col = slotIndex % cols;
        const pad = 20;
        const x = pad + col * (rectW + pad);
        const y = 130 + pad + row * (rectH + pad);
        eventBus.emit({ type: 'StartMenuPlayerReady', slot: slotIndex, x, y, width: rectW, height: rectH });
    }

    private checkAllReady(connections: PlayerConnectionState[]): boolean{
        var anyReady = connections.some(pc => pc.status === 'ready');
        var anyNotReady = connections.some(pc => pc.status === 'joined');
        return anyReady && !anyNotReady;
    }
}