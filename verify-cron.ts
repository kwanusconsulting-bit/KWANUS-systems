import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
    try {
        const logs = await prisma.eventLog.findMany({
            where: {
                resource: "Motherboard",
                action: "CRON_MOTHERBOARD_RUN"
            },
            orderBy: { createdAt: "desc" },
            take: 1
        });

        if (logs.length > 0) {
            console.log("CRON_RUN_DETECTED: YES");
            console.log("DETAILS:", JSON.stringify(logs[0].metadata));
        } else {
            console.log("CRON_RUN_DETECTED: NO");
        }
    } catch (e) {
        console.error("DB_ERROR:", e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
