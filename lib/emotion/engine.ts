import { calculateIntensity, determineMode } from './calculate';
import { EmotionalState, BASELINE_STATE } from './state';
import { eventRouter } from '../events/router';

/**
 * KWANUS Emotional Engine (Mind Layer)
 * Central orchestrator for all internal emotional signals.
 */

class EmotionalEngine {
    private state: EmotionalState = BASELINE_STATE;

    getState(): EmotionalState {
        return this.state;
    }

    /**
     * Processes incoming events to shift the global resonance.
     */
    processEvents(events: any[]) {
        const intensity = calculateIntensity(events);
        const mode = determineMode(intensity);

        const newState: EmotionalState = { mode, intensity };

        if (this.state.mode !== newState.mode) {
            console.log(`[EMOTION_ENGINE] Mode Shift: ${this.state.mode} -> ${newState.mode}`);
            eventRouter.emit({
                id: `shift-${Date.now()}`,
                type: 'INTENSITY_SHIFT',
                domain: 'emotional',
                userId: 'system',
                payload: newState,
                createdAt: new Date().toISOString()
            });
        }

        this.state = newState;
    }
}

export const emotionalEngine = new EmotionalEngine();
