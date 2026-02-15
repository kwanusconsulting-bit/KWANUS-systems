// lib/emotion.ts

export type EmotionalState = "worst" | "neutral" | "progressing" | "thriving";

export const emotionalThemes = {
    worst: {
        bgGlow: "from-blue-900/40 via-slate-800/40 to-slate-900/40",
        cardGlow: "from-blue-500/20 via-slate-500/20 to-slate-600/20",
        accent: "text-blue-300",
        border: "border-blue-400/30",
    },
    neutral: {
        bgGlow: "from-slate-500/30 via-slate-400/20 to-slate-600/20",
        cardGlow: "from-slate-400/20 via-slate-500/20 to-slate-600/20",
        accent: "text-slate-300",
        border: "border-slate-400/30",
    },
    progressing: {
        bgGlow: "from-amber-400/30 via-orange-400/20 to-rose-500/20",
        cardGlow: "from-amber-400/20 via-orange-400/20 to-rose-500/20",
        accent: "text-amber-300",
        border: "border-amber-400/30",
    },
    thriving: {
        bgGlow: "from-emerald-400/30 via-cyan-400/20 to-sky-500/20",
        cardGlow: "from-emerald-400/20 via-cyan-400/20 to-sky-500/20",
        accent: "text-emerald-300",
        border: "border-emerald-400/30",
    },
};

export function getEmotionTheme(state: EmotionalState) {
    return emotionalThemes[state];
}
