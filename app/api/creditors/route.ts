import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { upsertCreditor, setCreditorAddress, setCreditorBureauRule } from "@/lib/credit/intel/engine";

const prisma = new PrismaClient();

// GET /api/creditors — list all
export async function GET() {
    try {
        const creditors = await prisma.creditor.findMany({
            include: { addresses: { where: { active: true } }, bureauRules: true },
            orderBy: { name: "asc" }
        });
        return NextResponse.json(creditors);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/creditors — create/upsert creditor with optional address + rule
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, category, bureau, address, preferredDisputeType, notes } = body;

        if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });

        const creditor = await upsertCreditor(name, category);

        if (bureau && address) {
            await setCreditorAddress(creditor.id, bureau, address);
        }
        if (bureau && (preferredDisputeType || notes)) {
            await setCreditorBureauRule(creditor.id, bureau, preferredDisputeType, notes);
        }

        return NextResponse.json(creditor, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
