import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/client/api";

export function useJourneys() {
    const [journeys, setJourneys] = useState<any[]>([]);

    async function refresh() {
        const data = await apiGet("/api/journeys") as any[];
        setJourneys(data);
    }

    async function create(title: string, description?: string) {
        await apiPost("/api/journeys", { title, description });
        refresh();
    }

    useEffect(() => {
        refresh();
    }, []);

    return { journeys, create };
}
