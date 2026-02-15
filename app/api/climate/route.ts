export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { ClimateEngine } from "@/lib/engines/climate-engine";
import { safeApi } from "@/lib/safe-api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const engine = new ClimateEngine(user.id);
        const climate = await engine.getClimate();

        return { climate };
    }, req);
}
