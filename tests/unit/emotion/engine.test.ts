import { emotionalEngine } from '@/lib/emotion/engine';
import { calculateIntensity, determineMode } from '@/lib/emotion/calculate';

describe('KWANUS Emotional Engine', () => {
    test('calculateIntensity should baseline at 0.5', () => {
        expect(calculateIntensity([])).toBe(0.5);
    });

    test('determineMode should return thriving for high intensity', () => {
        expect(determineMode(0.9)).toBe('thriving');
    });

    test('determineMode should return worst for low intensity', () => {
        expect(determineMode(0.1)).toBe('worst');
    });

    test('Engine should emit INTENSITY_SHIFT on mode change', () => {
        const spy = jest.spyOn(console, 'log');
        emotionalEngine.processEvents([{ intensity: 0.1 }]); // Shift to worst
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Mode Shift'));
        spy.mockRestore();
    });
});
