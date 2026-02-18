
import { NextResponse } from "next/server";
import { scanTextCompliance } from "@/lib/motherboard/producers/compliance";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { text } = body;

        if (!text) {
            return NextResponse.json({ error: "Text required" }, { status: 400 });
        }

        const result = scanTextCompliance(text);

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
