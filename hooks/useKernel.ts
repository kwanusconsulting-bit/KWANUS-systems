"use client";

import { useEffect, useState } from "react";

export function useKernel() {
    const [kernel, setKernel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchKernel() {
            try {
                const res = await fetch("/api/kernel/state");
                const data = await res.json();
                setKernel(data);
            } catch (e) {
                console.error("Kernel sync failed:", e);
            } finally {
                setLoading(false);
            }
        }

        fetchKernel();

        // Refresh consciousness every 60 seconds
        const interval = setInterval(fetchKernel, 60000);
        return () => clearInterval(interval);
    }, []);

    return { kernel, loading };
}
