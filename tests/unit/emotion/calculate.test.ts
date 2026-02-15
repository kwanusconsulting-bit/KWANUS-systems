import { calculateIntensity, determineMode } from '@/lib/emotion/calculate';

describe('Emotional Calculation Logic', () => {
    test('calculateIntensity handles empty events', () => {
        expect(calculateIntensity([])).toBe(0.5);
    });

    test('calculateIntensity averages event intensities', () => {
        const events = [{ intensity: 0.2 }, { intensity: 0.4 }];
        expect(calculateIntensity(events)).toBe(0.3);
    });

    test('determineMode transitions at correct thresholds', () => {
        expect(determineMode(0.2)).toBe('worst');
        expect(determineMode(0.4)).toBe('neutral');
        expect(determineMode(0.7)).toBe('progressing');
        expect(determineMode(0.9)).toBe('thriving');
    });
});
