import { useEffect, useState } from "react";
import { apiGet } from "@/lib/client/api";

export function useCredit() {
    const [report, setReport] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    async function refresh() {
        setIsLoading(true);
        try {
            const data = await apiGet("/api/reports/latest") as any;
            if (data && data.report) {
                setReport(data.report);
            }
        } catch (error) {
            console.error("Failed to refresh credit data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return { report, isLoading, refresh };
}
