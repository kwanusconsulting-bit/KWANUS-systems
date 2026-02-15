"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function GlassCard({ children, className = "" }: any) {
    const { emotionalState, personaMode } = useTheme();

    return (
        <div
            className={`
        p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10
        motion-${emotionalState}
        persona-${personaMode}-motion
        ${className}
      `}
        >
            {children}
        </div>
    );
}
