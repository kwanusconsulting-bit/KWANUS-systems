export const EmotionalSpectrum = {
    WORST: "worst",
    LOW: "low",
    NEUTRAL: "neutral",
    RISING: "rising",
    THRIVING: "thriving"
} as const;

export type EmotionalStateKey = keyof typeof EmotionalSpectrum;

export const EmotionalMap: Record<EmotionalStateKey, string> = {
    WORST: "cool-blue",
    LOW: "deep-indigo",
    NEUTRAL: "gray-beige",
    RISING: "warm-coral",
    THRIVING: "vibrant-emerald"
};
