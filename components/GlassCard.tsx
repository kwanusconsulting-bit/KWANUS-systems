// components/GlassCard.tsx
"use client";

import Glass from "./Glass";

export default function GlassCard({
    title,
    value,
    subtitle,
}: {
    title: string;
    value: string | number;
    subtitle?: string;
}) {
    return (
        <Glass padding="p-4" rounded="rounded-xl">
            <div className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    {title}
                </span>
                <span className="text-lg font-semibold text-slate-50">{value}</span>
                {subtitle && (
                    <span className="text-xs text-slate-400">{subtitle}</span>
                )}
            </div>
        </Glass>
    );
}
