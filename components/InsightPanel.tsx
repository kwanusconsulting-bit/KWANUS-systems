"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { apiGet } from "@/lib/client/api";

interface Insight {
    id: string;
    type: string;
    title: string;
    message: string;
    tone: "GENTLE" | "CELEBRATORY" | "REFLECTIVE" | "URGENT";
}

export function InsightPanel() {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGet("/api/insights")
            .then((data: any) => {
                setInsights(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || insights.length === 0) return null;

    return (
        <div className="grid gap-4 mb-6 animation-fade-in-up">
            {insights.map((insight) => (
                <Card
                    key={insight.id}
                    className={`
            border-l-4 overflow-hidden relative
            ${insight.tone === 'CELEBRATORY' ? 'border-l-emerald-400 bg-emerald-950/20 shadow-[0_0_15px_-3px_rgba(52,211,153,0.1)]' : ''}
            ${insight.tone === 'GENTLE' ? 'border-l-indigo-400 bg-indigo-950/20 shadow-[0_0_15px_-3px_rgba(129,140,248,0.1)]' : ''}
            ${insight.tone === 'REFLECTIVE' ? 'border-l-slate-400 bg-slate-900/40 shadow-[0_0_15px_-3px_rgba(148,163,184,0.1)]' : ''}
            ${insight.tone === 'URGENT' ? 'border-l-rose-400 bg-rose-950/20 shadow-[0_0_15px_-3px_rgba(251,113,133,0.1)]' : ''}
          `}
                >
                    <div className="flex items-start gap-4 z-10 relative">
                        <div className="text-xl pt-1 min-w-[24px] text-center filter drop-shadow-md">
                            {insight.tone === 'CELEBRATORY' && '✨'}
                            {insight.tone === 'GENTLE' && '🌿'}
                            {insight.tone === 'REFLECTIVE' && '🌙'}
                            {insight.tone === 'URGENT' && '⚡'}
                        </div>
                        <div>
                            <div className="text-sm font-semibold mb-1 text-white/95 tracking-wide">
                                {insight.title}
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed font-light">
                                {insight.message}
                            </p>
                        </div>
                    </div>

                    {/* Subtle background glow effect using a pseudo-element logic via absolute div */}
                    <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-10 pointer-events-none transform translate-x-10 -translate-y-10
            ${insight.tone === 'CELEBRATORY' ? 'bg-emerald-500' : ''}
            ${insight.tone === 'GENTLE' ? 'bg-indigo-500' : ''}
            ${insight.tone === 'REFLECTIVE' ? 'bg-slate-500' : ''}
            ${insight.tone === 'URGENT' ? 'bg-rose-500' : ''}
          `} />
                </Card>
            ))}
        </div>
    );
}
