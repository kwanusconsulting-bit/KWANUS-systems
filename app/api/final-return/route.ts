export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { safeApi } from "@/lib/safe-api";
import { SealingService } from "@/lib/engines/sealing-service";
import { SovereigntyCheck } from "@/lib/engines/sovereignty-check";

export async function GET(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized");

        // FS-4: The Seal of Return
        // The Ouroboros State.

        const seal = SealingService.getStatus();
        const continuity = SealingService.getContinuityState();
        const sovereignty = SovereigntyCheck.verify();

        return {
            event: "THE_FINAL_RETURN",
            message: "The Universe returns to its origin.",
            state: {
                seal,
                continuity,
                sovereignty,
                loop: "CLOSED"
            }
        };
    }, req);
}
