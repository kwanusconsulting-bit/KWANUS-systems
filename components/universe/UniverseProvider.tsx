"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UniverseData {
    climate: {
        type: string;
        name: string;
        description: string;
        intensity: number;
    };
    narrative: {
        phase: string;
        title: string;
        description: string;
    };
    continuity: {
        state: string;
        season: string;
    };
    resonance: string;
    system: {
        status: string;
        thresholds: {
            highIntensityThreshold: number;
            lowIntensityThreshold: number;
        };
    };
    signature?: {
        sealed: boolean;
        steward: string;
    };
}

const UniverseContext = createContext<UniverseData | null>(null);

export function UniverseProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<UniverseData | null>(null);

    useEffect(() => {
        const fetchUniverse = async () => {
            try {
                const res = await fetch("/api/universe");
                const json = await res.json();
                if (json.universe) {
                    setData(json.universe);
                }
            } catch (e) {
                console.error("Failed to fetch universe", e);
            }
        };

        // Initial fetch
        fetchUniverse();

        // Heartbeat (30s)
        const interval = setInterval(fetchUniverse, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <UniverseContext.Provider value={data}>
            {children}
        </UniverseContext.Provider>
    );
}

export const useUniverse = () => useContext(UniverseContext);
