/**
 * KWANUS Locale: en-US
 * Emotional-Adaptive Translation Mapping
 */

export const enUS = {
    common: {
        welcome: {
            worst: "Peace be with you. You are safe here.",
            neutral: "Welcome back, Steward.",
            thriving: "The universe is in resonance. Welcome, Steward!"
        },
        actions: {
            sync: "Synchronize Nexus",
            settings: "System Settings",
            logout: "Exit Session"
        }
    },
    analytics: {
        pulse: "Resonance Pulse",
        insights: "Domain Interpretation"
    }
};

export type TranslationKey = keyof typeof enUS;
