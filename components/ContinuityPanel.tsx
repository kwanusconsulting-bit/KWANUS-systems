"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { apiGet } from "@/lib/client/api";

interface ContinuityData {
    state: string;
    title: string;
    description: string;
    trend: string;
    windowDays: number;
}

export function ContinuityPanel() {
    const [data, setData] = useState<ContinuityData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGet("/api/continuity")
            .then((res: any) => {
                setData(res.continuity);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || !data) return null;

    return (
        <div className="mb-8 k-fade-in delay-300">
            <Card className="k-card k-depth-1 hover:k-depth-2 p-6 border-l-2 border-l-white/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-white/50 mb-1">Temporal Arc ({data.windowDays} Days)</h3>
                        <h2 className="text-xl font-light text-white/90">{data.title}</h2>
                    </div>
                    <div className="text-right">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                            {data.state}
                        </div>
                    </div>
                </div>
                <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-2xl">
                    {data.description}
                </p>
            </Card>
        </div>
    );
}
