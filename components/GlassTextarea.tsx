// components/GlassTextarea.tsx
"use client";

import { TextareaHTMLAttributes } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { emotionalStateColors } from "@/lib/emotionalState";

interface GlassTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export default function GlassTextarea({
    className = "",
    ...props
}: GlassTextareaProps) {
    const { emotionalState } = useTheme();
    const palette = emotionalStateColors[emotionalState];

    return (
        <textarea
            className={`
        w-full px-3 py-2 rounded-xl
        bg-white/5 backdrop-blur-xl
        border ${palette.border}
        text-sm ${palette.text}
        placeholder:text-slate-500
        focus:outline-none focus:ring-2 focus:ring-emerald-400/40
        transition-all duration-300
        min-h-[100px]
        resize-y
        ${className}
      `}
            {...props}
        />
    );
}
