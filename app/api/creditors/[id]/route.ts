import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCreditorStats } from "@/lib/credit/intel/stats";
import { autoRouteDispute } from "@/lib/disputes/auto-route";

const prisma = new PrismaClient();

// GET /api/creditors/[id]
export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const creditor = await prisma.creditor.findUnique({
            where: { id },
            include: {
                addresses: true,
                bureauRules: true,
                outcomes: { orderBy: { createdAt: "desc" }, take: 20 }
            }
        });
        if (!creditor) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const stats = await getCreditorStats(id);
        return NextResponse.json({ ...creditor, stats });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/creditors/[id] — auto-route query
// Body: { bureau: "EX" | "EQ" | "TU" }
export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const creditor = await prisma.creditor.findUnique({ where: { id } });
        if (!creditor) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const { bureau } = await req.json();
        if (!bureau) return NextResponse.json({ error: "bureau required" }, { status: 400 });

        const route = await autoRouteDispute(creditor.name, bureau);
        return NextResponse.json(route);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
