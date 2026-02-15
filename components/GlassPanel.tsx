// components/GlassPanel.tsx
"use client";

import { ReactNode } from "react";
import Glass from "./Glass";

export default function GlassPanel({
    title,
    children,
    className = "",
}: {
    title?: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <Glass className={`p-6 ${className}`}>
            {title && (
                <h2 className="text-lg font-semibold text-slate-100 mb-4">{title}</h2>
            )}
            {children}
        </Glass>
    );
}
