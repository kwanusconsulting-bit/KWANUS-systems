import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { estimateDeletionProbability } from "@/lib/ml/probability";

const prisma = new PrismaClient();

// POST /api/ml/probability
// Body: { creditorId, reasonCode }
export async function POST(req: Request) {
    try {
        const { creditorId, reasonCode } = await req.json();

        if (!creditorId || !reasonCode) {
            return NextResponse.json({ error: "creditorId and reasonCode are required" }, { status: 400 });
        }

        const creditor = await prisma.creditor.findUnique({ where: { id: creditorId } });
        if (!creditor) return NextResponse.json({ error: "Creditor not found" }, { status: 404 });

        const result = await estimateDeletionProbability(creditorId, reasonCode);

        // Log event
        await prisma.eventLog.create({
            data: {
                action: "ML_PROBABILITY_SCORED",
                resource: "DisputeOutcome",
                metadata: JSON.stringify({ creditorId, reasonCode, ...result })
            }
        });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
