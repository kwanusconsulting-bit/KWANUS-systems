"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function PersonaText({ children, className = "" }: any) {
    const { personaMode }: any = useTheme();

    const tone: any = {
        soft: "text-white/70 italic font-serif",
        balanced: "text-white/80",
        direct: "text-white font-semibold tracking-tight",
    };

    return <div className={`${tone[personaMode]} ${className}`}>{children}</div>;
}
