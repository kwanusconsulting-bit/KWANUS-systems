import { KwanusEvent, EventType } from './types';

/**
 * KWANUS Event Router (Circulatory System)
 * Handling all high-resonance internal signals.
 */

type EventHandler = (event: KwanusEvent) => void;

class EventRouter {
    private handlers: Map<string, EventHandler[]> = new Map();
    private eventQueue: KwanusEvent[] = [];

    /**
     * Subscribe to specific event types or all ('*')
     */
    on(type: EventType | '*', handler: EventHandler) {
        const list = this.handlers.get(type) || [];
        list.push(handler);
        this.handlers.set(type, list);
    }

    /**
     * Emit an event into the system's awareness.
     */
    emit(event: KwanusEvent) {
        console.log(`[EVENT_ROUTER] ${event.domain.toUpperCase()}:${event.type}`);

        // Add to circulatory queue for audit/resilience
        this.eventQueue.push(event);
        if (this.eventQueue.length > 100) this.eventQueue.shift();

        // Immediate dispatch
        const typeHandlers = this.handlers.get(event.type) || [];
        const domainHandlers = this.handlers.get(event.domain as any) || []; // Cast as any for domain-level ops
        const globalHandlers = this.handlers.get('*') || [];

        [...typeHandlers, ...domainHandlers, ...globalHandlers].forEach(h => h(event));
    }

    getHistory(): KwanusEvent[] {
        return this.eventQueue;
    }
}

export const eventRouter = new EventRouter();
