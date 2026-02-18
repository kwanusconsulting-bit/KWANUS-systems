// components/EmotionalStateBadge.tsx
"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { emotionalStateColors } from "@/lib/emotionalState";

export default function EmotionalStateBadge() {
    const { emotionalState } = useTheme();
    const palette = emotionalStateColors[emotionalState as keyof typeof emotionalStateColors];

    const stateLabels = {
        worst: "Overwhelmed",
        neutral: "Steady & Clear",
        progressing: "Moving Forward",
        thriving: "Thriving"
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] border ${palette.bg} ${palette.text} ${palette.border} ${palette.glow}`}
        >
            Emotional State: {stateLabels[emotionalState as keyof typeof stateLabels]}
        </span>
    );
}
