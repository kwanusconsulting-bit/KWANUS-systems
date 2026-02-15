import { NextResponse } from "next/server";
import { getDispute } from "@/lib/disputes/engine";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: disputeId } = await params;
    try {
        const dispute = await getDispute(disputeId);

        if (!dispute) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(dispute);
    } catch (error) {
        console.error(`[API_DISPUTES] GET ${disputeId} Error: `, error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
