import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Normalize a creditor name for deduplication.
 * Lowercases, strips punctuation, trims whitespace.
 */
export function normalizeCreditorName(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

/**
 * Find or create a Creditor by name.
 */
export async function upsertCreditor(name: string, category?: string) {
    const normalized = normalizeCreditorName(name);
    return prisma.creditor.upsert({
        where: { normalized },
        update: {},
        create: { name, normalized, category },
        include: { addresses: true, bureauRules: true }
    });
}

/**
 * Add or update a bureau address for a creditor.
 */
export async function setCreditorAddress(creditorId: string, bureau: string, address: string) {
    // Deactivate existing active address for this bureau
    await prisma.creditorAddress.updateMany({
        where: { creditorId, bureau, active: true },
        data: { active: false }
    });
    return prisma.creditorAddress.create({
        data: { creditorId, bureau, address, active: true }
    });
}

/**
 * Set bureau rule (preferred dispute type, notes) for a creditor.
 */
export async function setCreditorBureauRule(
    creditorId: string,
    bureau: string,
    preferredDisputeType?: string,
    notes?: string
) {
    // Upsert: one rule per creditor+bureau
    const existing = await prisma.bureauRule.findFirst({ where: { creditorId, bureau } });
    if (existing) {
        return prisma.bureauRule.update({
            where: { id: existing.id },
            data: { preferredDisputeType, notes }
        });
    }
    return prisma.bureauRule.create({
        data: { creditorId, bureau, preferredDisputeType, notes }
    });
}

/**
 * Get full creditor intel by normalized name.
 */
export async function getCreditorIntel(name: string) {
    const normalized = normalizeCreditorName(name);
    return prisma.creditor.findUnique({
        where: { normalized },
        include: {
            addresses: { where: { active: true } },
            bureauRules: true,
            outcomes: { orderBy: { createdAt: "desc" }, take: 50 }
        }
    });
}
