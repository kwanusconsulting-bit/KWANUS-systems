export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { GuidanceEngine } from "@/lib/engines/guidance-engine";
import { safeApi } from "@/lib/safe-api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const engine = new GuidanceEngine(user.id);
        const guidance = await engine.generateGuidance();

        return guidance;
    }, req);
}
