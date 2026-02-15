import { NextResponse } from "next/server";
import { createRound } from "@/lib/disputes/engine";

export async function POST(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: disputeId } = await params;
    try {
        const round = await createRound(disputeId);
        return NextResponse.json(round);
    } catch (error) {
        console.error(`[API_DISPUTES] POST Round for ${disputeId} Error: `, error);
        return NextResponse.json({ error: "Failed to create round" }, { status: 500 });
    }
}
