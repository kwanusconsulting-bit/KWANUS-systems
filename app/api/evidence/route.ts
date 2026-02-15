import { NextResponse } from "next/server";
import { addEvidence } from "@/lib/disputes/engine";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const evidence = await addEvidence({
            disputeId: body.disputeId,
            roundId: body.roundId,
            itemId: body.itemId,
            url: body.url,
            type: body.type,
        });

        return NextResponse.json(evidence);
    } catch (error) {
        console.error("[API_EVIDENCE] POST Error:", error);
        return NextResponse.json({ error: "Failed to add evidence" }, { status: 500 });
    }
}
