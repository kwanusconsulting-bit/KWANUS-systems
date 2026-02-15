// components/ui/EmotionalBadge.tsx
"use client";

interface EmotionalBadgeProps {
    state: "worst" | "neutral" | "progressing" | "thriving";
    label?: string;
    showDot?: boolean;
}

export default function EmotionalBadge({ state, label, showDot = true }: EmotionalBadgeProps) {
    const states = {
        worst: {
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            text: "text-blue-300",
            dot: "bg-blue-400",
            glow: "shadow-[0_0_12px_rgba(59,130,246,0.6)]",
            label: label || "Overwhelmed",
        },
        neutral: {
            bg: "bg-slate-500/10",
            border: "border-slate-500/20",
            text: "text-slate-300",
            dot: "bg-slate-400",
            glow: "shadow-[0_0_12px_rgba(148,163,184,0.6)]",
            label: label || "Neutral",
        },
        progressing: {
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            text: "text-amber-300",
            dot: "bg-amber-400",
            glow: "shadow-[0_0_12px_rgba(251,191,36,0.6)]",
            label: label || "Progressing",
        },
        thriving: {
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            text: "text-emerald-300",
            dot: "bg-emerald-400",
            glow: "shadow-[0_0_12px_rgba(52,211,153,0.8)]",
            label: label || "Thriving",
        },
    };

    const config = states[state];

    return (
        <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-xl ${config.bg} ${config.border}`}
        >
            {showDot && <div className={`h-2 w-2 rounded-full ${config.dot} ${config.glow}`} />}
            <span className={`text-xs font-medium ${config.text}`}>{config.label}</span>
        </div>
    );
}
