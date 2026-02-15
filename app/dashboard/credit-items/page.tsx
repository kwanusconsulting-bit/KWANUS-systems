export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import GlassButton from "@/components/ui/GlassButton";

export default async function CreditItemsPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const items = await prisma.creditItem.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6">
            <PageHeader
                title="Credit Items"
                subtitle="Track all items across your credit reports"
                action={
                    <GlassButton href="/dashboard/credit-items/create" variant="primary">
                        + Add Item
                    </GlassButton>
                }
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.length === 0 && (
                    <div className="col-span-full">
                        <GlassCard>
                            <p className="text-center text-slate-400">No credit items yet.</p>
                            <p className="mt-2 text-center text-xs text-slate-500">
                                Add your first credit item to start tracking your credit profile.
                            </p>
                        </GlassCard>
                    </div>
                )}

                {items.map((item) => (
                    <GlassCard
                        key={item.id}
                        href={`/dashboard/credit-items/${item.id}`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-semibold text-white">{item.creditorName}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                    {item.accountNumber}
                                </p>
                                <span className="mt-2 inline-block rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-300">
                                    {item.status}
                                </span>
                            </div>
                            {item.balance !== null && (
                                <p className="text-lg font-bold text-emerald-300">
                                    ${item.balance.toLocaleString()}
                                </p>
                            )}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
