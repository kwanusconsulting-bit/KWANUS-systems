"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function GlassPanel({ children, className = "" }: any) {
    const { emotionalState, personaMode } = useTheme();

    return (
        <div
            className={`
        p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10
        motion-${emotionalState}
        persona-${personaMode}-motion
        ${className}
      `}
        >
            {children}
        </div>
    );
}
