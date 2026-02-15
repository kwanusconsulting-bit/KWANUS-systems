"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { PersonaText } from "@/components/ui";

export function PageHeader({ title, subtitle, ritualTitle, emotionalState: propState, className = "" }: any) {
    const { emotionalState: themeState, personaMode } = useTheme();
    const state = propState || themeState;

    return (
        <div className={`mb-10 animate-fade-in motion-${state} persona-${personaMode}-motion ${className}`}>
            <div className="space-y-1">
                {ritualTitle && (
                    <PersonaText className={`text-[10px] uppercase tracking-[0.4em] font-medium opacity-50`}>
                        {ritualTitle}
                    </PersonaText>
                )}
                <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                    {title}
                </h1>
            </div>
            {subtitle && (
                <p className="text-xs text-white/40 uppercase tracking-[0.5em] mt-3 font-bold">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
