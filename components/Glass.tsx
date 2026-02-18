// components/Glass.tsx
"use client";

import { ReactNode } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { emotionalStateColors } from "@/lib/emotionalState";

export default function Glass({
    children,
    padding = "p-4",
    rounded = "rounded-2xl",
    className = "",
}: {
    children: ReactNode;
    padding?: string;
    rounded?: string;
    className?: string;
}) {
    const { emotionalState } = useTheme();
    const palette = emotionalStateColors[emotionalState as keyof typeof emotionalStateColors];

    return (
        <div
            className={`
        ${rounded}
        ${padding}
        border
        backdrop-blur-xl
        bg-white/5
        ${palette.border}
        ${palette.glow}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
