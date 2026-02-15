export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getRecentEvents } from "@/lib/governance/audit";

export async function GET() {
    const events = await getRecentEvents(20);
    return NextResponse.json(events);
}
