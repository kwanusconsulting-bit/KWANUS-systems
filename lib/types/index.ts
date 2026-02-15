/* --- KWANUS OS — CORE DATA TYPES --- */

export type EmotionalHarmonic = "Low" | "Moderate" | "Stable" | "High" | "Perfect";
export type EmotionalForce = "Gravity" | "Momentum" | "Friction" | "Illumination";
export type EmotionalTone = "Worst" | "Neutral" | "Progress" | "Thriving";

export interface EmotionalState {
    id: string;
    tone: EmotionalTone;
    force: EmotionalForce;
    harmonic: EmotionalHarmonic;
    timestamp: string;
}

export interface Partner {
    id: string;
    name: string;
    tier: string;
    state: string;
    harmonic: EmotionalHarmonic;
    lineage: string;
    capabilities: string[];
    permissions: string[];
    workflows: string[];
}

export interface CreditItem {
    id: string;
    type: string;
    status: string;
    emotionalImpact: "Positive" | "Neutral" | "Negative";
    timestamp: string;
}

export interface User {
    id: string;
    name: string;
    role: string;
    emotionalProfile: string;
}
