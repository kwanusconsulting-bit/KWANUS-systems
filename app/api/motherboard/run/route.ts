import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { runMotherboard } from "@/lib/motherboard/run";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        let { tenantId } = body;

        if (!tenantId) {
            const firstTenant = await prisma.tenant.findFirst();
            if (firstTenant) {
                tenantId = firstTenant.id;
            } else {
                return NextResponse.json({ error: "No tenant found" }, { status: 400 });
            }
        }

        const count = await runMotherboard(tenantId);
        return NextResponse.json({ success: true, message: `Motherboard run complete. Generated ${count} cards.` });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
