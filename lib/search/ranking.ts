import { emotionalEngine } from '../emotion/engine';

/**
 * KWANUS Search Ranking
 * Weighting results by emotional resonance and domain relevance.
 */

export function calculateRankingScore(match: any): number {
    const emotion = emotionalEngine.getState();
    const baseScore = match.score || 0.5;

    // Boost relevance if domain matches current emotional mode
    const resonanceBoost = (match.domain === 'emotional' && emotion.mode === 'progressing') ? 0.2 : 0;

    return baseScore + resonanceBoost;
}
