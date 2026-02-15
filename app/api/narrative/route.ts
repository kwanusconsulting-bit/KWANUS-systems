export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { NarrativeEngine } from "@/lib/engines/narrative-engine";
import { safeApi } from "@/lib/safe-api";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) {
            throw new Error("Unauthorized");
        }

        const narrativeEngine = new NarrativeEngine(user.id);
        const narrative = await narrativeEngine.generateNarrative();

        return { narrative };
    }, req);
}
