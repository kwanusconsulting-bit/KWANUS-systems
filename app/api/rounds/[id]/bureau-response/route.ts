import { NextResponse } from "next/server";
import { addBureauResponse } from "@/lib/disputes/engine";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: roundId } = await params;
        const body = await req.json();

        const response = await addBureauResponse({
            roundId: roundId,
            bureau: body.bureau,
            status: body.status,
            message: body.message,
        });

        return NextResponse.json(response);
    } catch (error) {
        const { id } = await params;
        console.error(`[API_ROUNDS] POST Bureau Response for ${id} Error: `, error);
        return NextResponse.json({ error: "Failed to add bureau response" }, { status: 500 });
    }
}
