// components/SlideUp.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import Motion from "./Motion";

export default function SlideUp({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <Motion
            className={`
        transition-all
        ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        ${className}
      `}
        >
            {children}
        </Motion>
    );
}
