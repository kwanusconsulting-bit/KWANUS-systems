"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function GlassInput({ value, onChange, placeholder, type = "text", className = "" }: any) {
    const { emotionalState, personaMode } = useTheme();

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`
        w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-white/40 outline-none 
        focus:border-white/30 transition
        motion-${emotionalState}
        persona-${personaMode}-motion
        ${className}
      `}
        />
    );
}
