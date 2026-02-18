import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { recommendStrategy } from "@/lib/ml/strategy";

const prisma = new PrismaClient();

// POST /api/ml/strategy
// Body: { creditorId, reasonCode, negativeItemType? }
export async function POST(req: Request) {
    try {
        const { creditorId, reasonCode, negativeItemType } = await req.json();

        if (!creditorId || !reasonCode) {
            return NextResponse.json({ error: "creditorId and reasonCode are required" }, { status: 400 });
        }

        const creditor = await prisma.creditor.findUnique({ where: { id: creditorId } });
        if (!creditor) return NextResponse.json({ error: "Creditor not found" }, { status: 404 });

        const result = await recommendStrategy(creditorId, reasonCode, negativeItemType);

        // Log event
        await prisma.eventLog.create({
            data: {
                action: "ML_STRATEGY_RECOMMENDED",
                resource: "DisputeOutcome",
                metadata: JSON.stringify({ creditorId, reasonCode, strategy: result.recommendedStrategy, score: result.probabilityScore })
            }
        });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
