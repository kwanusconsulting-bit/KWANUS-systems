// lib/emotionalState.ts

export type EmotionalState = "worst" | "neutral" | "progressing" | "thriving";

export const emotionalStateColors: Record<
    EmotionalState,
    {
        bg: string;
        glow: string;
        text: string;
        border: string;
    }
> = {
    worst: {
        bg: "bg-sky-900/40",
        glow: "shadow-[0_0_40px_rgba(56,189,248,0.45)]",
        text: "text-sky-300",
        border: "border-sky-400/40",
    },
    neutral: {
        bg: "bg-stone-800/40",
        glow: "shadow-[0_0_40px_rgba(168,162,158,0.35)]",
        text: "text-stone-300",
        border: "border-stone-400/40",
    },
    progressing: {
        bg: "bg-rose-900/40",
        glow: "shadow-[0_0_40px_rgba(244,63,94,0.45)]",
        text: "text-rose-300",
        border: "border-rose-400/40",
    },
    thriving: {
        bg: "bg-emerald-900/40",
        glow: "shadow-[0_0_40px_rgba(52,211,153,0.55)]",
        text: "text-emerald-300",
        border: "border-emerald-400/40",
    },
};
