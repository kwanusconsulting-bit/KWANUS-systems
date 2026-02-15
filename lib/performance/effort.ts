/**
 * KWANUS Effort System
 * Managing resource prioritization and background execution.
 */

export type PerformanceMode = 'low-power' | 'standard' | 'high-effort' | 'adaptive';

export interface TaskPayload {
    id: string;
    domain: string;
    priority: number;
    action: () => void;
}

class TaskScheduler {
    private queue: TaskPayload[] = [];

    /**
     * Schedules a task to run during browser idle time.
     */
    schedule(task: TaskPayload) {
        this.queue.push(task);
        this.queue.sort((a, b) => b.priority - a.priority); // High priority first

        if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            window.requestIdleCallback((deadline) => {
                while (deadline.timeRemaining() > 0 && this.queue.length > 0) {
                    const next = this.queue.shift();
                    if (next) {
                        console.log(`[EFFORT] Executing Background Task: ${next.domain}:${next.id}`);
                        next.action();
                    }
                }
            });
        } else {
            // Fallback for Safari
            setTimeout(() => {
                const next = this.queue.shift();
                if (next) next.action();
            }, 100);
        }
    }
}

export const effortScheduler = new TaskScheduler();

/**
 * Domain-specific priority weights
 */
export const DOMAIN_PRIORITY = {
    emotional: 10,
    hybrid: 8,
    partner: 6,
    productivity: 4,
    system: 2
};
