import { calculateHybridScore, FinancialData } from './calculate';
import { emotionalEngine } from '../emotion/engine';
import { eventRouter } from '../events/router';

/**
 * KWANUS Hybrid Engine (Mind Layer)
 * Managing the high-resonance financial-emotional scores.
 */

class HybridEngine {
    private currentScore: number = 0;

    calculate(financial: FinancialData) {
        const emotionalState = emotionalEngine.getState();
        const score = calculateHybridScore(financial, emotionalState.intensity);

        if (score !== this.currentScore) {
            this.currentScore = score;
            console.log(`[HYBRID_ENGINE] New Hybrid Score: ${score}`);

            eventRouter.emit({
                id: `hybrid-${Date.now()}`,
                type: 'PULSE_UPDATE',
                domain: 'hybrid',
                userId: 'system',
                payload: { score },
                createdAt: new Date().toISOString()
            });
        }

        return score;
    }
}

export const hybridEngine = new HybridEngine();
