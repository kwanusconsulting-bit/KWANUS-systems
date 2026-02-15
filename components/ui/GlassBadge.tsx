"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function GlassBadge({ children, className = "" }: any) {
    const { emotionalState, personaMode } = useTheme();

    return (
        <span className={`
      px-3 py-1 rounded-lg bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest 
      motion-${emotionalState}
      persona-${personaMode}-motion
      ${className}
    `}>
            {children}
        </span>
    );
}
