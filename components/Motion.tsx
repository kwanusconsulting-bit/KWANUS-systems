// components/Motion.tsx
"use client";

import { ReactNode } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { motionTokens } from "@/lib/motion";

export default function Motion({
    children,
    className = "",
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    as?: any;
}) {
    const { emotionalState } = useTheme();
    const motion = motionTokens[emotionalState as keyof typeof motionTokens];

    return (
        <Tag
            className={className}
            style={{
                transitionDuration: motion.duration,
                transitionTimingFunction: motion.easing,
            }}
        >
            {children}
        </Tag>
    );
}
