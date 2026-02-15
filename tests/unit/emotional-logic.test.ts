import { VOICE_MODULATION } from '../../lib/brand/identity';

describe('KWANUS OS: Emotional Logic Integrity', () => {
    test('Voice Modulation: Worst Mode Protection', () => {
        const worstVoice = VOICE_MODULATION['worst'];
        expect(worstVoice.tone).toBe('soft');
        expect(worstVoice.complexity).toBe('minimal');
        expect(worstVoice.pacing).toBe('slow');
    });

    test('Voice Modulation: Thriving Mode Expansion', () => {
        const thrivingVoice = VOICE_MODULATION['thriving'];
        expect(thrivingVoice.tone).toBe('expressive');
        expect(thrivingVoice.complexity).toBe('expanded');
        expect(thrivingVoice.pacing).toBe('snappy');
    });
});
