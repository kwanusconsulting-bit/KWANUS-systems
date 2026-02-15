// components/FadeIn.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import Motion from "./Motion";

export default function FadeIn({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <Motion
            className={`
        transition-opacity transform
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
        ${className}
      `}
        >
            {children}
        </Motion>
    );
}
