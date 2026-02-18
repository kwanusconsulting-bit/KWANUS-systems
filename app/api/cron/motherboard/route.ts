import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { runMotherboard } from "@/lib/motherboard/run";
import { acquireLock, releaseLock } from "@/lib/motherboard/lock";
import { expireStaleCards } from "@/lib/motherboard/lifecycle";
import { logger, createRequestId } from "@/lib/logger";

const prisma = new PrismaClient();

// GET /api/cron/motherboard
// Called by Vercel Cron — secured by CRON_SECRET header
export async function GET(req: Request) {
    const requestId = createRequestId();

    // Verify cron secret
    const cronSecret = req.headers.get("x-cron-secret");
    if (process.env.CRON_SECRET && cronSecret !== process.env.CRON_SECRET) {
        logger.warn("Cron: unauthorized attempt", { requestId });
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenants = await prisma.tenant.findMany({ select: { id: true, name: true } });
    const results: { tenantId: string; cards: number; expired: number; skipped?: boolean }[] = [];

    for (const tenant of tenants) {
        const locked = await acquireLock(tenant.id);

        if (!locked) {
            logger.warn("Cron: tenant locked, skipping", { requestId, tenantId: tenant.id });
            results.push({ tenantId: tenant.id, cards: 0, expired: 0, skipped: true });
            continue;
        }

        try {
            logger.info("Cron: running Motherboard", { requestId, tenantId: tenant.id });
            const cards = await runMotherboard(tenant.id);
            const expired = await expireStaleCards(tenant.id);

            await prisma.eventLog.create({
                data: {
                    tenantId: tenant.id,
                    action: "CRON_MOTHERBOARD_RUN",
                    resource: "Motherboard",
                    metadata: JSON.stringify({ requestId, cards, expired })
                }
            });

            results.push({ tenantId: tenant.id, cards, expired });
            logger.info("Cron: run complete", { requestId, tenantId: tenant.id, cards, expired });
        } catch (error: any) {
            logger.error("Cron: run failed", { requestId, tenantId: tenant.id, error: error.message });
        } finally {
            await releaseLock(tenant.id);
        }
    }

    return NextResponse.json({ requestId, results });
}
