export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export default async function FundingPage() {
    const applications = await prisma.fundingApplication.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-xl font-semibold tracking-tight">Funding</h1>
                    <p className="text-xs text-slate-400">
                        View and track funding applications across products and statuses.
                    </p>
                </div>
                <a
                    href="/dashboard/funding/create"
                    className="text-xs text-slate-300 underline hover:text-white"
                >
                    + New Application
                </a>
            </header>

            <section className="space-y-3">
                <h2 className="text-sm font-medium">Applications</h2>
                <div className="space-y-2 text-xs">
                    {applications.length === 0 && (
                        <p className="text-slate-500">No funding applications yet.</p>
                    )}
                    {applications.map((a) => (
                        <div
                            key={a.id}
                            className="rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 flex justify-between gap-3"
                        >
                            <div className="space-y-1">
                                <p className="font-medium text-[13px]">
                                    {a.productType} — ${a.requestedAmount}
                                </p>
                                <p className="text-slate-400 text-[11px]">
                                    Status: {a.status}
                                </p>
                                <a
                                    href={`/dashboard/funding/${a.id}`}
                                    className="block text-slate-300 underline hover:text-white"
                                >
                                    Edit
                                </a>
                            </div>
                            {a.emotionalTone && (
                                <p className="text-[11px] text-slate-500">
                                    Tone: {a.emotionalTone}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
