"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiGet } from "@/lib/client/api";

interface Guidance {
    id: string;
    type: string;
    title: string;
    action: string;
    tone: "GENTLE" | "DIRECT" | "REFLECTIVE" | "INVITING";
}

export function GuidancePanel() {
    const [guidanceList, setGuidanceList] = useState<Guidance[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGet("/api/guidance")
            .then((data: any) => {
                setGuidanceList(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || guidanceList.length === 0) return null;

    // For now, show the primary guidance (first one)
    const primary = guidanceList[0];

    return (
        <div className="mb-8 k-fade-in delay-100">
            <Card className="k-card k-depth-2 border border-white/10 relative overflow-hidden group">

                {/* Ambient background based on tone */}
                <div className={`absolute inset-0 opacity-10 transition-opacity duration-1000
            ${primary.tone === 'GENTLE' ? 'bg-gradient-to-r from-sky-500/20 to-transparent' : ''}
            ${primary.tone === 'INVITING' ? 'bg-gradient-to-r from-violet-500/20 to-transparent' : ''}
            ${primary.tone === 'DIRECT' ? 'bg-gradient-to-r from-emerald-500/20 to-transparent' : ''}
            ${primary.tone === 'REFLECTIVE' ? 'bg-gradient-to-r from-indigo-500/20 to-transparent' : ''}
        `} />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-1">
                    <div className="flex items-start gap-5">
                        <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0
                    ${primary.tone === 'GENTLE' ? 'bg-sky-500/20 text-sky-200' : ''}
                    ${primary.tone === 'INVITING' ? 'bg-violet-500/20 text-violet-200' : ''}
                    ${primary.tone === 'DIRECT' ? 'bg-emerald-500/20 text-emerald-200' : ''}
                    ${primary.tone === 'REFLECTIVE' ? 'bg-indigo-500/20 text-indigo-200' : ''}
                `}>
                            {primary.tone === 'GENTLE' && '💧'}
                            {primary.tone === 'INVITING' && '✨'}
                            {primary.tone === 'DIRECT' && '🌱'}
                            {primary.tone === 'REFLECTIVE' && '🌑'}
                        </div>
                        <div>
                            <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                                GUIDANCE
                            </div>
                            <h3 className="text-lg font-medium text-white/90 mb-1">
                                {primary.title}
                            </h3>
                            <p className="text-sm text-white/60 max-w-xl leading-relaxed">
                                {primary.action}
                            </p>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <Button
                            className="border-white/10 hover:bg-white/5 text-xs tracking-widest uppercase"
                        >
                            Accept
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
