"use client";

import { ReactNode, useEffect } from "react";
import { useAdaptiveTheme } from "@/hooks/useAdaptiveTheme";
import { useEmotionalStates } from "@/hooks/useEmotionalStates";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const { states } = useEmotionalStates();
    const latest = states[0] || null;

    const theme = useAdaptiveTheme(latest?.intensity ?? null);

    useEffect(() => {
        const body = document.body;
        body.classList.add("k-emotion-bg", "k-emotion-settle");

        body.style.backgroundColor = theme.bg;
        body.style.setProperty("--card-bg", theme.card);
        body.style.setProperty("--accent-primary", theme.accent);

        const timeout = setTimeout(() => {
            body.classList.remove("k-emotion-settle");
        }, 1800);

        return () => clearTimeout(timeout);
    }, [theme]);

    return <>{children}</>;
}
