import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { simulateCapitalStack } from "@/lib/funding/simulator";
import { checkInquiryGuard, markSimulationRun } from "@/lib/funding/inquiry-guard";
import { ReadinessBand } from "@/lib/funding/score";

const prisma = new PrismaClient();

// POST /api/funding/simulate
// Body: { tenantId? }
export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        let { tenantId } = body;

        if (!tenantId) {
            const first = await prisma.tenant.findFirst();
            if (first) tenantId = first.id;
            else return NextResponse.json({ error: "No tenant found" }, { status: 400 });
        }

        // Inquiry guard
        const guard = await checkInquiryGuard(tenantId);
        if (!guard.allowed) {
            return NextResponse.json({ blocked: true, warning: guard.warning, hoursUntilAllowed: guard.hoursUntilAllowed }, { status: 429 });
        }

        // Load FundingReadiness
        const profile = await prisma.fundingReadiness.findUnique({ where: { tenantId } });
        if (!profile) {
            return NextResponse.json({ error: "Run /api/funding/readiness first to calculate your profile." }, { status: 400 });
        }

        const result = simulateCapitalStack({
            readinessBand: (profile.readinessBand ?? "LOW") as ReadinessBand,
            readinessScore: profile.readinessScore ?? 0,
            utilization: profile.utilization
        });

        // Mark simulation run (triggers 24h guard)
        await markSimulationRun(tenantId);

        // Log event
        await prisma.eventLog.create({
            data: {
                tenantId,
                action: "FUNDING_SIMULATION_RUN",
                resource: "FundingReadiness",
                metadata: JSON.stringify(result)
            }
        });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
