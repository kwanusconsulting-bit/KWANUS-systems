export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { InsightEngine } from "@/lib/engines/insight-engine";
import { safeApi } from "@/lib/safe-api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const engine = new InsightEngine(user.id);
        const insights = await engine.generateInsights();

        // If no insights, return the quiet universe insight to maintain presence
        if (insights.length === 0) {
            return [InsightEngine.getQuietInsight()];
        }

        return insights;
    }, req);
}
