import { emotionalEngine } from '../emotion/engine';
import { emotionalInsightEngine } from './engines';

/**
 * KWANUS Insight Generator
 * Synthesizing multi-domain patterns into actionable meaning.
 */

export interface IntelligenceInsight {
    id: string;
    domain: 'emotional' | 'hybrid' | 'partner';
    level: 'info' | 'caution' | 'critical';
    message: string;
    resonance: number;
}

export async function generateCurrentInsights(): Promise<IntelligenceInsight[]> {
    const emotion = emotionalEngine.getState();
    const insights: IntelligenceInsight[] = [];

    if (emotion.intensity < 0.3) {
        insights.push({
            id: 'ins-1',
            domain: 'emotional',
            level: 'caution',
            message: "low resonance detected. recommending a grounding ritual.",
            resonance: 0.2
        });
    }

    // Adding insight from the analytics engine
    const trend = emotionalInsightEngine.analyzeTrend([]);
    if (trend) {
        insights.push({
            id: trend.id,
            domain: 'emotional',
            level: trend.importance === 'high' ? 'critical' : 'info',
            message: trend.message,
            resonance: trend.intensity
        });
    }

    return insights;
}
