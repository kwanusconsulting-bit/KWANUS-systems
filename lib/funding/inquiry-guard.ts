import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GUARD_WINDOW_HOURS = 24;

export interface InquiryGuardResult {
    allowed: boolean;
    hoursUntilAllowed?: number;
    warning?: string;
}

/**
 * Prevents repeated simulation runs within 24h.
 * Logs EventLog on block.
 */
export async function checkInquiryGuard(tenantId: string): Promise<InquiryGuardResult> {
    const profile = await prisma.fundingReadiness.findUnique({
        where: { tenantId }
    });

    if (!profile?.lastSimulatedAt) {
        return { allowed: true };
    }

    const hoursSinceLast = (Date.now() - profile.lastSimulatedAt.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLast < GUARD_WINDOW_HOURS) {
        const hoursUntilAllowed = Math.ceil(GUARD_WINDOW_HOURS - hoursSinceLast);

        // Log the blocked attempt
        await prisma.eventLog.create({
            data: {
                tenantId,
                action: "FUNDING_SIMULATION_BLOCKED",
                resource: "FundingReadiness",
                metadata: JSON.stringify({ hoursSinceLast: Math.round(hoursSinceLast), hoursUntilAllowed })
            }
        });

        return {
            allowed: false,
            hoursUntilAllowed,
            warning: `Simulation already run ${Math.round(hoursSinceLast)}h ago. Wait ${hoursUntilAllowed}h before simulating again to avoid reckless stacking.`
        };
    }

    return { allowed: true };
}

/**
 * Mark simulation as run now.
 */
export async function markSimulationRun(tenantId: string): Promise<void> {
    await prisma.fundingReadiness.upsert({
        where: { tenantId },
        update: { lastSimulatedAt: new Date() },
        create: {
            tenantId,
            lastSimulatedAt: new Date()
        }
    });
}
