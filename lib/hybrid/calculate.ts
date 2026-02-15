/**
 * KWANUS Hybrid Engine: Calculation
 * Merges emotional intensity with financial/credit data.
 */

export interface FinancialData {
    score: number;
    negativeItems: number;
    disputeProgress: number;
}

export function calculateHybridScore(financial: FinancialData, emotionalIntensity: number): number {
    // Weight: 70% Financial, 30% Emotional Resilience
    const financialWeight = (financial.score / 850) * 0.7;
    const emotionalWeight = emotionalIntensity * 0.3;

    const hybridRaw = (financialWeight + emotionalWeight) * 100;
    return Math.round(hybridRaw);
}
