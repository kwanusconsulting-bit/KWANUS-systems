import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkFundingGates } from "@/lib/funding/gates";
import { calculateReadinessScore } from "@/lib/funding/score";

const prisma = new PrismaClient();

// POST /api/funding/readiness
// Body: { tenantId?, personalScore, utilization, inquiries6m, openAccounts, negativeItems }
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { personalScore, utilization, inquiries6m, openAccounts, negativeItems } = body;

        let { tenantId } = body;
        if (!tenantId) {
            const first = await prisma.tenant.findFirst();
            if (first) tenantId = first.id;
            else return NextResponse.json({ error: "No tenant found" }, { status: 400 });
        }

        const gates = checkFundingGates({ personalScore, utilization, inquiries6m, negativeItems });
        const { readinessScore, band, breakdown } = calculateReadinessScore({
            personalScore, utilization, inquiries6m, openAccounts, negativeItems
        });

        // Persist / update FundingReadiness
        await prisma.fundingReadiness.upsert({
            where: { tenantId },
            update: { personalScore, utilization, inquiries6m, openAccounts, negativeItems, readinessScore, readinessBand: band },
            create: { tenantId, personalScore, utilization, inquiries6m, openAccounts, negativeItems, readinessScore, readinessBand: band }
        });

        // Log event
        await prisma.eventLog.create({
            data: {
                tenantId,
                action: "FUNDING_READINESS_CALCULATED",
                resource: "FundingReadiness",
                metadata: JSON.stringify({ readinessScore, band, gates })
            }
        });

        return NextResponse.json({ gates, readinessScore, band, breakdown });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
