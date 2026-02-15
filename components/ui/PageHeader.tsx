// components/ui/PageHeader.tsx
"use client";

import EmotionalBadge from "./EmotionalBadge";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    emotionalState?: "worst" | "neutral" | "progressing" | "thriving";
    action?: React.ReactNode;
}

export default function PageHeader({
    title,
    subtitle,
    emotionalState,
    action,
}: PageHeaderProps) {
    return (
        <div className="mb-8">
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                    {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-3">
                    {emotionalState && <EmotionalBadge state={emotionalState} />}
                    {action}
                </div>
            </div>
        </div>
    );
}
