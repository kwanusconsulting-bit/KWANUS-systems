import { calculateHybridScore } from '@/lib/hybrid/calculate';
import { getHybridTier } from '@/lib/hybrid/thresholds';

describe('KWANUS Hybrid Engine', () => {
    const mockFinancial = { score: 700, negativeItems: 0, disputeProgress: 1.0 };

    test('calculateHybridScore should weight both dimensions', () => {
        const score = calculateHybridScore(mockFinancial, 0.9);
        expect(score).toBeGreaterThan(0);
        expect(score).toBeLessThanOrEqual(1000);
    });

    test('getHybridTier should return ELITE for high scores', () => {
        expect(getHybridTier(860)).toBe('ELITE');
    });

    test('getHybridTier should return CRITICAL for low scores', () => {
        expect(getHybridTier(150)).toBe('CRITICAL');
    });
});
