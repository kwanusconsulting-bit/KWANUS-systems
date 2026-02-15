
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding bank products...')

    // Banks
    await prisma.bank.upsert({
        where: { id: 'bank1' },
        update: {},
        create: {
            id: "bank1",
            name: "Chase",
            products: {
                create: {
                    id: "prod1",
                    name: "Chase Business Line",
                    minScore: 70,
                    maxScore: 100,
                    maxAmount: 25000
                }
            }
        }
    })

    await prisma.bank.upsert({
        where: { id: 'bank2' },
        update: {},
        create: {
            id: "bank2",
            name: "Bank of America",
            products: {
                create: {
                    id: "prod2",
                    name: "BOA Cash Builder",
                    minScore: 65,
                    maxScore: 95,
                    maxAmount: 15000
                }
            }
        }
    })

    await prisma.bank.upsert({
        where: { id: 'bank3' },
        update: {},
        create: {
            id: "bank3",
            name: "Navy Federal",
            products: {
                create: {
                    id: "prod3",
                    name: "NFCU Business Rewards",
                    minScore: 60,
                    maxScore: 90,
                    maxAmount: 20000
                }
            }
        }
    })

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
