import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        let tenantId = searchParams.get("tenantId");

        if (!tenantId) {
            const firstTenant = await prisma.tenant.findFirst();
            if (firstTenant) {
                tenantId = firstTenant.id;
            } else {
                return NextResponse.json({ error: "No tenant found" }, { status: 400 });
            }
        }

        const tenant = await prisma.tenant.findUnique({
            where: { id: tenantId },
            include: { financeSnapshots: true }
        });

        if (!tenant) {
            return NextResponse.json({ error: "Tenant not found" }, { status: 404 });
        }

        const decisionCards = await prisma.decisionCard.findMany({
            where: { user: { tenantId } },
            orderBy: { createdAt: "desc" },
            take: 100
        });

        const eventLogs = await prisma.eventLog.findMany({
            where: { tenantId },
            orderBy: { createdAt: "desc" },
            take: 100
        });

        return NextResponse.json({
            generatedAt: new Date().toISOString(),
            tenant,
            decisionCards,
            eventLogs,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
