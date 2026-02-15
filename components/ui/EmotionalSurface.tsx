"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function EmotionalSurface({ children, className = "" }: any) {
    const { emotionalState } = useTheme();

    const glow: any = {
        worst: "emotional-glow-worst",
        neutral: "emotional-glow-neutral",
        progressing: "emotional-glow-progressing",
        thriving: "emotional-glow-thriving",
    };

    return (
        <div className={`${glow[emotionalState]} rounded-2xl ${className}`}>
            {children}
        </div>
    );
}
