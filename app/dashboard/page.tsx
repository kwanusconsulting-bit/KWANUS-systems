export const dynamic = "force-dynamic";
import { loadDashboardData } from "./loader";
import StatCard from "@/components/dashboard/StatCard";

export default async function DashboardPage() {
    const data = await loadDashboardData();

    return (
        <div className="space-y-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white">System Overview</h1>
                <p className="text-slate-400 text-sm">Welcome back. The system is currently in a <span className="text-white font-medium">{data.emotionalState}</span> resonance.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Credit Items" value={data.items} />
                <StatCard title="Active Disputes" value={data.disputes} />
                <StatCard title="Funding Requests" value={data.funding} />
                <StatCard
                    title="Emotional State"
                    value={data.emotionalState}
                    accent={
                        data.emotionalState === 'THRIVING' ? 'text-emerald-400' :
                            data.emotionalState === 'PROGRESSING' ? 'text-coral-400' :
                                data.emotionalState === 'WORST' ? 'text-blue-400' :
                                    'text-slate-400'
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardLink
                    href="/dashboard/credit-items"
                    title="Credit Items"
                    description="Manage your credit, track disputes, and evolve your financial lineage."
                />
                <DashboardLink
                    href="/dashboard/disputes"
                    title="Dispute Center"
                    description="Review and initiate new credit challenges."
                />
                <DashboardLink
                    href="/dashboard/funding"
                    title="Funding Pipeline"
                    description="Monitor capital requests and approval states."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-white/5 bg-white/5 p-6 space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Quick Actions</h2>
                    <div className="flex flex-wrap gap-2">
                        <a href="/dashboard/credit-items/create" className="px-3 py-1.5 rounded-md bg-white text-slate-950 text-xs font-medium hover:bg-slate-200 transition">Add Item</a>
                        <a href="/dashboard/disputes/create" className="px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition border border-white/10">New Dispute</a>
                        <a href="/dashboard/funding/create" className="px-3 py-1.5 rounded-md bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition border border-white/10">Request Funding</a>
                    </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/5 p-6 space-y-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">OS Identity</h2>
                    <p className="text-xs text-slate-400 italic">&quot;The steward shapes the field, and the field reflects the steward.&quot;</p>
                    <a href="/dashboard/identity" className="inline-block text-xs text-white underline hover:text-slate-300">Update Profile →</a>
                </div>
            </div>
        </div>
    );
}

function DashboardLink({ href, title, description }: { href: string; title: string, description: string }) {
    return (
        <a
            href={href}
            className="group rounded-xl border border-white/5 bg-white/5 p-6 hover:border-white/20 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white">{title}</h3>
                <span className="text-white/20 group-hover:text-white transition-colors">→</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        </a>
    )
}
