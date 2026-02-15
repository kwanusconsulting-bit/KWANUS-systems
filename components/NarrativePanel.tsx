"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { apiGet } from "@/lib/client/api";

type NarrativeChapter = {
    title: string;
    subtitle: string;
    description: string;
    currentArchetype: string;
};

export function NarrativePanel() {
    const [narrative, setNarrative] = useState<NarrativeChapter | null>(null);

    useEffect(() => {
        apiGet("/api/narrative")
            .then((data: any) => setNarrative(data.narrative))
            .catch(() => { });
    }, []);

    if (!narrative) return null;

    return (
        <div className="mb-6 k-fade-in delay-400">
            <div className="text-center mb-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">Current Chapter</span>
            </div>
            <Card className="k-card bg-white/5 border-none p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <h2 className="text-3xl font-serif italic text-white/90 mb-2">{narrative.title}</h2>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-6">{narrative.subtitle}</p>

                <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed italic">
                    &quot;{narrative.description}&quot;
                </p>

                <div className="mt-6 pt-6 border-t border-white/5 inline-block">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Archetype: <span className="text-white/80">{narrative.currentArchetype}</span></span>
                </div>
            </Card>
        </div>
    );
}
