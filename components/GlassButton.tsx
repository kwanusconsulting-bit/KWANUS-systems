// components/GlassButton.tsx
"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { emotionalStateColors } from "@/lib/emotionalState";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export default function GlassButton({
    children,
    className = "",
    ...props
}: GlassButtonProps) {
    const { emotionalState } = useTheme();
    const palette = emotionalStateColors[emotionalState];

    return (
        <button
            className={`
        px-4 py-2 rounded-xl
        bg-white/5 backdrop-blur-xl
        border ${palette.border}
        ${palette.glow}
        text-sm font-medium ${palette.text}
        hover:bg-white/10
        transition-all duration-300
        ${className}
      `}
            {...props}
        >
            {children}
        </button>
    );
}
