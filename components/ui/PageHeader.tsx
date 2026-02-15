"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function PageHeader({ title, subtitle, emotionalState: propState, className = "" }: any) {
    const { emotionalState: themeState, personaMode } = useTheme();
    const state = propState || themeState;

    return (
        <div className={`mb-10 animate-fade-in motion-${state} persona-${personaMode}-motion ${className}`}>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                {title}
            </h1>
            {subtitle && (
                <p className="text-xs text-white/40 uppercase tracking-[0.5em] mt-2 font-bold">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
