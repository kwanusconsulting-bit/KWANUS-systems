import { EmotionalTone, EmotionalHarmonic, EmotionalForce } from "@/lib/types";

export interface ThemeConfig {
    modeClass: string;
    glowIntensity: number;
    motionScale: number;
}

export const getThemeConfig = (tone: EmotionalTone): string => {
    return `k-mode-${tone.toLowerCase()}`;
};

export const getHarmonicScaling = (harmonic: EmotionalHarmonic) => {
    const map = {
        "Low": 0.5,
        "Moderate": 0.75,
        "Stable": 1.0,
        "High": 1.25,
        "Perfect": 1.5
    };
    return map[harmonic] || 1.0;
};

export const getForceAnimation = (force: EmotionalForce) => {
    const map = {
        "Gravity": "animate-pulse",
        "Momentum": "animate-bounce",
        "Friction": "opacity-50",
        "Illumination": "animate-spin-slow"
    };
    return map[force] || "";
};
