// components/GlassInput.tsx
"use client";

import { InputHTMLAttributes } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { emotionalStateColors } from "@/lib/emotionalState";

interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export default function GlassInput({
    className = "",
    ...props
}: GlassInputProps) {
    const { emotionalState } = useTheme();
    const palette = emotionalStateColors[emotionalState as keyof typeof emotionalStateColors];

    return (
        <input
            className={`
        w-full px-3 py-2 rounded-xl
        bg-white/5 backdrop-blur-xl
        border ${palette.border}
        text-sm ${palette.text}
        placeholder:text-slate-500
        focus:outline-none focus:ring-2 focus:ring-emerald-400/40
        transition-all duration-300
        ${className}
      `}
            {...props}
        />
    );
}
