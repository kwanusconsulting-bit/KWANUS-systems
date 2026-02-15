/**
 * KWANUS Brand & Identity Architecture
 * The "Soul System" constants and voice pillars.
 */

export const BRAND_PILLARS = {
    EMOTIONAL_INTELLIGENCE: "The OS understands, adapts, and responds with care.",
    MYTHIC_MODERNITY: "A blend of cosmic symbolism and clean 2026 product design.",
    CEREMONIAL_CONTINUITY: "Every interaction feels intentional, rhythmic, and grounded."
};

export const NAMING_CONVENTIONS = {
    EMOTIONAL: "Check-In",
    PARTNERS: "Harmonics",
    HYBRID: "Hybrid Score",
    Coping: "Grounding Tools"
};

export interface VoiceTraits {
    tone: 'soft' | 'steady' | 'warm' | 'expressive';
    complexity: 'minimal' | 'balanced' | 'expanded';
    pacing: 'slow' | 'normal' | 'snappy';
}

export const VOICE_MODULATION: Record<string, VoiceTraits> = {
    worst: {
        tone: 'soft',
        complexity: 'minimal',
        pacing: 'slow'
    },
    neutral: {
        tone: 'steady',
        complexity: 'balanced',
        pacing: 'normal'
    },
    progressing: {
        tone: 'warm',
        complexity: 'expanded',
        pacing: 'normal'
    },
    thriving: {
        tone: 'expressive',
        complexity: 'expanded',
        pacing: 'snappy'
    }
};
