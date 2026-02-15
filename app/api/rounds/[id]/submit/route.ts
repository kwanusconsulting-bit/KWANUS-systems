import { NextResponse } from "next/server";
import { submitRound } from "@/lib/disputes/engine";

export async function POST(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: roundId } = await params;
    try {
        const round = await submitRound(roundId);
        return NextResponse.json(round);
    } catch (error) {
        console.error(`[API_ROUNDS] POST Submit ${roundId} Error:`, error);
        return NextResponse.json({ error: "Failed to submit round" }, { status: 500 });
    }
}
