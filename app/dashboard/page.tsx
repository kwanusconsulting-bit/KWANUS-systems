// app/dashboard/page.tsx
"use client";

import { usePresence } from "@/hooks/usePresence";
import Dashboard from "@/components/dashboard/Dashboard";
import CeremonialArrival from "@/components/os/CeremonialArrival";

export default function DashboardPage() {
    return (
        <div className="space-y-6 p-6">
            {/* Ceremonial Arrival / Emotional State Header */}
            <CeremonialArrival />

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    label="Credit Items"
                    value="12"
                    description="Tracked across bureaus"
                    color="emerald"
                />
                <StatCard
                    label="Open Disputes"
                    value="3"
                    description="In active motion"
                    color="sky"
                />
                <StatCard
                    label="Funding Apps"
                    value="2"
                    description="Awaiting decisions"
                    color="amber"
                />
                <StatCard
                    label="Documents"
                    value="8"
                    description="Securely stored"
                    color="violet"
                />
            </div >

            {/* Main Content Grid */}
            < div className="grid gap-6 lg:grid-cols-3" >
                {/* Next Action - Takes 2 columns */}
                < div className="lg:col-span-2" >
                    <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                                Next Right Action
                            </h3>
                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                Today
                            </span>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-lg font-medium text-white">
                                Review dispute letter for Account #4321
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                The OS has already tracked the bureaus, dates, and documents—you only need
                                to confirm and send. This is one calm, focused move.
                            </p>
                            <button className="mt-4 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:shadow-lg">
                                Review Letter →
                            </button>
                        </div>
                    </div>
                </div >

                {/* Timeline Preview */}
                < div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl" >
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Recent Activity
                    </h3>
                    <div className="mt-4 space-y-4">
                        <TimelineItem
                            time="2h ago"
                            event="Emotional state updated"
                            detail="Steady & Clear"
                            color="emerald"
                        />
                        <TimelineItem
                            time="Yesterday"
                            event="Dispute created"
                            detail="Experian collection"
                            color="sky"
                        />
                        <TimelineItem
                            time="2 days ago"
                            event="Funding submitted"
                            detail="Community Lender"
                            color="amber"
                        />
                    </div>
                </div >
            </div >

            {/* Quick Links */}
            < div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" >
                <QuickLink href="/dashboard/credit-items" label="Credit Items" icon="📊" />
                <QuickLink href="/dashboard/disputes" label="Disputes" icon="⚖️" />
                <QuickLink href="/dashboard/funding" label="Funding" icon="💰" />
                <QuickLink href="/dashboard/documents" label="Documents" icon="📄" />
            </div >
        </div >
    );
}

function StatCard({ label, value, description, color }: any) {
    const colors = {
        emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-300",
        sky: "from-sky-500/10 to-sky-500/5 border-sky-500/20 text-sky-300",
        amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-300",
        violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20 text-violet-300",
    };

    return (
        <div className={`rounded-2xl border bg-gradient-to-br p-5 backdrop-blur-xl ${colors[color]}`}>
            <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
            <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
    );
}

function TimelineItem({ time, event, detail, color }: any) {
    const colors = {
        emerald: "text-emerald-300",
        sky: "text-sky-300",
        amber: "text-amber-300",
    };

    return (
        <div className="flex gap-3">
            <div className="flex-shrink-0">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-white/40" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400">{time}</p>
                <p className="text-sm font-medium text-white">{event}</p>
                <p className={`text-sm ${colors[color]}`}>{detail}</p>
            </div>
        </div>
    );
}

function QuickLink({ href, label, icon }: any) {
    return (
        <a
            href={href}
            className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20"
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                    {label}
                </span>
            </div>
        </a>
    );
}
