const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Logging test event...");
    const event = await prisma.systemEvent.create({
        data: {
            userId: 'demo-user',
            type: 'system_health_check',
            details: JSON.stringify({ status: 'manual_verification' })
        }
    });
    console.log({ event });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
