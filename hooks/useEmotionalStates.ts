import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/client/api";

export function useEmotionalStates() {
    const [states, setStates] = useState<any[]>([]);

    async function refresh() {
        const data = await apiGet("/api/emotional-states") as any[];
        setStates(data);
    }

    async function record(label: string, intensity: number) {
        await apiPost("/api/emotional-states", { label, intensity });
        refresh();
    }

    useEffect(() => {
        refresh();
    }, []);

    return { states, record };
}
