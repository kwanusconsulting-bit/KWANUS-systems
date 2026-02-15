"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/client/api";

interface ClimateState {
    type: string;
    title: string;
    description: string;
    palette: {
        primary: string;
        accent: string;
        background: string;
    };
}

export function ClimatePanel() {
    const [climate, setClimate] = useState<ClimateState | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiGet("/api/climate")
            .then((data: any) => {
                setClimate(data.climate);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading || !climate) return null;

    return (
        <div className="mb-4 k-fade-in">
            <div className="flex items-center justify-center py-2 px-4 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm inline-block mx-auto mb-6">
                <span className={`w-2 h-2 rounded-full mr-3 animate-pulse bg-${climate.palette.primary}`} />
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                    Atmosphere: <span className="text-white/90 font-medium">{climate.title}</span>
                </span>
            </div>

            {/* We can use this component to inject the background gradient into the page if we want, 
            or just display it here. For now, let's keep it contained but evocative. */}
        </div>
    );
}
