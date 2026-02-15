"use client";

import { useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";

export function usePresence(surface: string) {
    const { emotionalState, personaMode } = useTheme();

    useEffect(() => {
        // Simple device detection
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        fetch("/api/presence/record", {
            method: "POST",
            body: JSON.stringify({
                surface,
                device: isMobile ? "mobile" : "desktop",
                emotionalState,
                personaMode,
            }),
        });
    }, [surface, emotionalState, personaMode]);
}
