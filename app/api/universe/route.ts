export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { UniverseState } from "@/lib/engines/universe-state";
import { ConstellationService } from "@/lib/engines/constellation-service"; // IE-3
import { safeApi } from "@/lib/safe-api";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized");

        // Default View: The "Prime" Universe
        const universe = new UniverseState(user.id, "DEFAULT_PRIME");
        const state = await universe.getUnifiedState();

        // IE-3: Check Constellation Context
        const constellationService = new ConstellationService(user.id);
        const constellation = await constellationService.getConstellationState();

        return {
            universe: state,
            constellation // IE-3 Output
        };
    }, req);
}
