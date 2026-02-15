import { Guardrails } from '../../lib/developer/guardrails';

describe('KWANUS OS: Security & Sovereignty', () => {
    test('Data Boundary: Event Metadata Validation', () => {
        const invalidEvent = { type: 'GHOST_EVENT' };
        expect(() => Guardrails.validateEventResonance(invalidEvent)).toThrow();
    });

    test('Sovereignty: Valid Event Resonance', () => {
        const validEvent = {
            id: 'v-1',
            domain: 'financial',
            type: 'CREDIT_UPDATE',
            payload: { score: 750 }
        };
        expect(Guardrails.validateEventResonance(validEvent)).toBe(true);
    });
});
