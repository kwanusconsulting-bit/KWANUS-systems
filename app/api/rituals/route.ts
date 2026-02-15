export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { RitualEngine } from "@/lib/engines/ritual-engine";
import { safeApi } from "@/lib/safe-api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const engine = new RitualEngine(user.id);
        const rituals = await engine.generateRituals();

        return { rituals }; // Wrapping in object to match pattern
    }, req);
}
