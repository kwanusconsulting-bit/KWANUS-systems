export const emotionalThemes = {
    WORST: {
        bg: "bg-blue-950",
        sidebar: "bg-blue-900/40 border-blue-800",
        text: "text-blue-100",
        accent: "text-blue-300",
        activeLine: "bg-blue-500",
        card: "bg-blue-900/20 border-blue-800",
        button: "bg-blue-100 text-blue-900 hover:bg-white"
    },
    NEUTRAL: {
        bg: "bg-slate-950",
        sidebar: "bg-slate-900/40 border-slate-800",
        text: "text-slate-100",
        accent: "text-slate-300",
        activeLine: "bg-slate-500",
        card: "bg-slate-900/20 border-slate-800",
        button: "bg-slate-100 text-slate-900 hover:bg-white"
    },
    PROGRESSING: {
        bg: "bg-coral-950",
        sidebar: "bg-coral-900/40 border-coral-800",
        text: "text-coral-100",
        accent: "text-coral-300",
        activeLine: "bg-coral-500",
        card: "bg-coral-900/20 border-coral-800",
        button: "bg-coral-100 text-coral-900 hover:bg-white"
    },
    THRIVING: {
        bg: "bg-emerald-950",
        sidebar: "bg-emerald-900/40 border-emerald-800",
        text: "text-emerald-100",
        accent: "text-emerald-300",
        activeLine: "bg-emerald-500",
        card: "bg-emerald-900/20 border-emerald-800",
        button: "bg-emerald-100 text-emerald-900 hover:bg-white"
    }
} as const;

export type EmotionalState = keyof typeof emotionalThemes;
