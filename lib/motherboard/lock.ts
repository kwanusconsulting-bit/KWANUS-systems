import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Lock expires after 5 minutes — prevents double-runs but recovers from crashes
const LOCK_TTL_MS = 5 * 60 * 1000;

/**
 * Acquire a per-tenant Motherboard run lock.
 * Returns true if lock was acquired, false if already locked.
 */
export async function acquireLock(tenantId: string): Promise<boolean> {
    const now = new Date();
    const existing = await prisma.motherboardLock.findUnique({ where: { tenantId } });

    // If lock exists and hasn't expired, deny
    if (existing && existing.expiresAt > now) {
        return false;
    }

    // Upsert lock
    await prisma.motherboardLock.upsert({
        where: { tenantId },
        create: {
            tenantId,
            lockedAt: now,
            expiresAt: new Date(now.getTime() + LOCK_TTL_MS)
        },
        update: {
            lockedAt: now,
            expiresAt: new Date(now.getTime() + LOCK_TTL_MS)
        }
    });

    return true;
}

/**
 * Release the per-tenant lock after a run completes.
 */
export async function releaseLock(tenantId: string): Promise<void> {
    await prisma.motherboardLock.deleteMany({ where: { tenantId } });
}
