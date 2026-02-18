
import { NextResponse } from "next/server";
import { generateMarketingCampaign } from "@/lib/motherboard/producers/marketing";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { offer, audience } = body;

        if (!offer || !audience) {
            return NextResponse.json({ error: "Offer and Audience required" }, { status: 400 });
        }

        const result = generateMarketingCampaign({ offer, audience });

        return NextResponse.json(result);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
