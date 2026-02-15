export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlassButton } from "@/components/ui/GlassButton";

export default async function DisputesPage() {
    const { userId } = await auth();
    if (!userId) throw new Error("Not authenticated");

    const disputes = await prisma.dispute.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }
    });

    const stageColors: any = {
        drafting: "sky",
        sent: "amber",
        "in-review": "violet",
        resolved: "emerald",
    };

    return (
        <div className="space-y-6">
            <PageHeader
                ritualTitle="REPAIR RITUAL"
                title="Disputes"
                subtitle="Track and manage disputes against bureaus and creditors"
                action={
                    <GlassButton href="/dashboard/disputes/create" variant="primary">
                        + New Dispute
                    </GlassButton>
                }
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {disputes.length === 0 && (
                    <div className="col-span-full">
                        <GlassCard>
                            <p className="text-center text-slate-400">No disputes yet.</p>
                            <p className="mt-2 text-center text-xs text-slate-500">
                                Create your first dispute to start challenging inaccurate items.
                            </p>
                        </GlassCard>
                    </div>
                )}

                {disputes.map((dispute) => (
                    <GlassCard
                        key={dispute.id}
                        href={`/dashboard/disputes/${dispute.id}`}
                    >
                        <div className="space-y-3">
                            <div>
                                <p className="font-semibold text-white">{dispute.creditorName}</p>
                                <p className="mt-1 text-xs text-slate-400">
                                    {dispute.accountNumber}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">{dispute.bureau}</span>
                                <span className={`rounded-full px-2 py-0.5 bg-${stageColors[dispute.status] || 'slate'}-500/10 text-${stageColors[dispute.status] || 'slate'}-300`}>
                                    {dispute.status}
                                </span>
                            </div>

                            <p className="text-xs text-slate-500">{dispute.reason}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
