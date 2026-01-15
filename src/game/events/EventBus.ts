import { GameEvent } from "./eventTypes/GameEvent";

export class EventBus {
  private queue: GameEvent[] = [];

  emit(event: GameEvent) {
    this.queue.push(event);
  }

  drain(): GameEvent[] {
    const events = this.queue;
    this.queue = [];
    return events;
  }
}
