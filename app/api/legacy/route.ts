export const dynamic = "force-dynamic";
import { getCurrentUser } from "@/lib/currentUser";
import { safeApi } from "@/lib/safe-api";
import { CanonService } from "@/lib/engines/canon-service";
import { MythicArchive } from "@/lib/engines/mythic-archive";
import { TransmissionService } from "@/lib/engines/transmission-service";
import { EternalService } from "@/lib/engines/eternal-service";

export async function POST(req: Request) {
    return safeApi(async () => {
        const user = await getCurrentUser();
        if (!user) throw new Error("Unauthorized");

        const body = await req.json();
        const { action } = body;

        // LG-1: Seal Canon
        if (action === "SEAL_CANON") {
            return CanonService.seal(user.id);
        }

        // LG-2: Archive History
        if (action === "GENERATE_ARCHIVE") {
            const archive = new MythicArchive(user.id);
            return await archive.generateArchive();
        }

        // LG-3: Create Seed
        if (action === "TRANSMIT") {
            const transmission = new TransmissionService(user.id);
            return await transmission.createSeed();
        }

        // LG-4: Check Protection
        if (action === "CHECK_ETERNITY") {
            return await EternalService.protect();
        }

        return { error: "Invalid Action" };
    }, req);
}
