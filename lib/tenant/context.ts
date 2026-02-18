import { prisma } from "@/lib/prisma";

export async function getTenantContext(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { tenant: true },
    });

    if (!user || !user.tenantId) {
        return null;
    }

    return user.tenant;
}

export async function ensureTenantContext(userId: string) {
    const tenant = await getTenantContext(userId);
    if (!tenant) {
        throw new Error("No tenant context found");
    }
    return tenant;
}
