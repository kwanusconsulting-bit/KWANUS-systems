import { KwanusEvent } from './types';

/**
 * KWANUS Event Queue (The Memory Trace)
 * Buffering internal signals for processing and audit.
 */

class EventQueue {
    private queue: KwanusEvent[] = [];
    private readonly MAX_SIZE = 500;

    enqueue(event: KwanusEvent) {
        this.queue.push(event);
        if (this.queue.length > this.MAX_SIZE) {
            this.queue.shift();
        }
    }

    getQueue(): KwanusEvent[] {
        return [...this.queue];
    }

    clear() {
        this.queue = [];
    }
}

export const eventQueue = new EventQueue();
