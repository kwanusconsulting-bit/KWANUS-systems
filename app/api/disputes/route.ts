import { NextResponse } from "next/server";
import { createDispute } from "@/lib/disputes/engine";

export async function POST(req: Request) {
    try {
        const { userId } = await req.json();

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const dispute = await createDispute(userId, {
            bureau: "EXPERIAN", // Default for direct API call
            creditorName: "Unknown",
            reason: "Incorrect information",
        });
        return NextResponse.json(dispute);
    } catch (error) {
        console.error("[API_DISPUTES] POST Error:", error);
        return NextResponse.json({ error: "Failed to create dispute" }, { status: 500 });
    }
}
