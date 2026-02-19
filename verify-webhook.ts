import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
    try {
        const logs = await prisma.eventLog.findMany({
            where: {
                resource: "Stripe",
                action: "WEBHOOK_PROCESSED"
            },
            orderBy: { createdAt: "desc" },
            take: 1
        });

        if (logs.length > 0) {
            console.log("WEBHOOK_RECEIVED: YES");
            console.log("DETAILS:", JSON.stringify(logs[0].metadata));
        } else {
            console.log("WEBHOOK_RECEIVED: NO");
        }
    } catch (e) {
        console.error("DB_ERROR:", e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
