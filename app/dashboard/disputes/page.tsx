export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export default async function DisputesPage() {
    const disputes = await prisma.dispute.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight">Disputes</h1>
                    <p className="text-xs text-slate-400">
                        Track and manage disputes against bureaus and creditors.
                    </p>
                </div>
                <a
                    href="/dashboard/disputes/create"
                    className="text-xs text-slate-300 underline hover:text-white"
                >
                    + New Dispute
                </a>
            </header>

            <section className="space-y-3">
                <h2 className="text-sm font-medium">Existing Disputes</h2>
                <div className="space-y-2 text-xs">
                    {disputes.length === 0 && (
                        <p className="text-slate-500">No disputes yet.</p>
                    )}
                    {disputes.map((d) => (
                        <div
                            key={d.id}
                            className="rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 flex justify-between gap-3"
                        >
                            <div>
                                <p className="font-medium text-[13px]">
                                    {d.creditorName} — {d.accountNumber}
                                </p>
                                <p className="text-slate-400 text-[11px]">
                                    {d.bureau} • {d.reason}
                                </p>
                            </div>
                            <div className="text-right space-y-1 text-[11px] text-slate-400">
                                <p>Status: {d.status}</p>
                                <a
                                    href={`/dashboard/disputes/${d.id}`}
                                    className="block text-slate-300 underline hover:text-white"
                                >
                                    Edit
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
