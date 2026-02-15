import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/currentUser";
import { TimelineAggregator } from "@/lib/engines/timeline-aggregator";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const aggregator = new TimelineAggregator(user.id);
        const timeline = await aggregator.getUnifiedTimeline();

        return NextResponse.json(timeline);
    } catch (error) {
        console.error("[API_TIMELINE] GET Error: ", error);
        return NextResponse.json({ error: "Failed to fetch unified timeline" }, { status: 500 });
    }
}
