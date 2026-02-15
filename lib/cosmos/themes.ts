export interface Theme {
    bg: string;
    card: string;
    accent: string;
}

export const ThemePalettes = {
    "cool-blue": {
        bg: "#0A1A2F",
        card: "#11263D",
        accent: "#3B82F6"
    },
    "deep-indigo": {
        bg: "#0F1024",
        card: "#1A1B3A",
        accent: "#6366F1"
    },
    "gray-beige": {
        bg: "#1A1A1A",
        card: "#2A2A2A",
        accent: "#A8A29E"
    },
    "warm-coral": {
        bg: "#2A0F0F",
        card: "#3A1A1A",
        accent: "#F97316"
    },
    "vibrant-emerald": {
        bg: "#0F2A1A",
        card: "#1A3A2A",
        accent: "#10B981"
    }
} as const;

export type ThemeKey = keyof typeof ThemePalettes;
