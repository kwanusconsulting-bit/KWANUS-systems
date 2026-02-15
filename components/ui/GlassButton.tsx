"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function GlassButton({ children, onClick, className = "" }: any) {
    const { emotionalState, personaMode } = useTheme();

    return (
        <button
            onClick={onClick}
            className={`
        px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm
        hover:bg-white/20 active:scale-[0.97]
        motion-${emotionalState}
        persona-${personaMode}-motion
        ${className}
      `}
        >
            {children}
        </button>
    );
}
