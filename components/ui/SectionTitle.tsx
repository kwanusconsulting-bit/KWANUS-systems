"use client";

import { useTheme } from "@/providers/ThemeProvider";

export function SectionTitle({ children, className = "" }: any) {
    const { personaMode }: any = useTheme();

    const tone: any = {
        soft: "text-white/80 italic font-serif",
        balanced: "text-white",
        direct: "text-white font-semibold tracking-tight",
    };

    return <h2 className={`text-lg mb-2 ${tone[personaMode] || tone.balanced} ${className}`}>{children}</h2>;
}
