import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { upsertCreditor } from "@/lib/credit/intel/engine";

const prisma = new PrismaClient();

// POST /api/disputes/record-outcome
// Body: { creditorName, bureau, disputeType, result, daysToResponse? }
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { creditorName, bureau, disputeType, result, daysToResponse } = body;

        if (!creditorName || !bureau || !disputeType || !result) {
            return NextResponse.json(
                { error: "creditorName, bureau, disputeType, result are required" },
                { status: 400 }
            );
        }

        if (!["VERIFIED", "DELETED", "UPDATED"].includes(result)) {
            return NextResponse.json({ error: "result must be VERIFIED, DELETED, or UPDATED" }, { status: 400 });
        }

        // Upsert creditor (creates if not exists)
        const creditor = await upsertCreditor(creditorName);

        const outcome = await prisma.disputeOutcome.create({
            data: {
                creditorId: creditor.id,
                bureau,
                disputeType,
                result,
                daysToResponse: daysToResponse ? Number(daysToResponse) : null
            }
        });

        return NextResponse.json(outcome, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
