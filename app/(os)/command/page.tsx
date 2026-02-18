"use client";

import { useEffect, useState } from "react";

interface SystemData {
    openCards: number;
    approvedCards: number;
    expiredCards: number;
    totalEvents: number;
    recentEvents: { action: string; resource: string; createdAt: string }[];
    recentCards: { id: string; title: string; type: string; status: string; priority: number; createdAt: string }[];
}

async function fetchSystemData(): Promise<SystemData> {
    const res = await fetch("/api/command/summary");
    if (!res.ok) throw new Error("Failed to load");
    return res.json();
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        PENDING: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        APPROVED: "bg-green-500/20 text-green-300 border-green-500/30",
        REJECTED: "bg-red-500/20 text-red-300 border-red-500/30",
        HOLD: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        EXPIRED: "bg-gray-500/20 text-gray-400 border-gray-500/30"
    };
    return (
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[status] ?? "bg-white/10 text-white/60"}`}>
            {status}
        </span>
    );
}

function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 shadow-xl">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">{title}</h2>
            {children}
        </div>
    );
}

export default function CommandPage() {
    const [data, setData] = useState<SystemData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSystemData()
            .then(setData)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white p-6 md:p-10">
            {/* Header */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                    Founder Command
                </h1>
                <p className="text-white/40 text-sm mt-1">Real-time system intelligence — proposal-only, no auto-actions</p>
            </div>

            {loading && (
                <div className="text-white/40 text-sm animate-pulse">Loading system state...</div>
            )}

            {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 text-sm">
                    {error}
                </div>
            )}

            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {/* System Health */}
                    <GlassCard title="System Health">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Open Cards</span>
                                <span className="text-2xl font-bold text-white">{data.openCards}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Approved</span>
                                <span className="text-lg font-semibold text-green-400">{data.approvedCards}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Expired (72h)</span>
                                <span className="text-lg font-semibold text-white/40">{data.expiredCards}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Total Events</span>
                                <span className="text-lg font-semibold text-white/60">{data.totalEvents}</span>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Open DecisionCards */}
                    <GlassCard title="Open Decision Cards">
                        {data.recentCards.length === 0 ? (
                            <p className="text-white/30 text-sm">No pending cards.</p>
                        ) : (
                            <div className="space-y-3">
                                {data.recentCards.slice(0, 6).map(card => (
                                    <div key={card.id} className="flex items-start justify-between gap-2">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-white/80 truncate">{card.title}</p>
                                            <p className="text-xs text-white/30 mt-0.5">{card.type} · P{card.priority}</p>
                                        </div>
                                        <StatusBadge status={card.status} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>

                    {/* Recent Events */}
                    <GlassCard title="Recent Activity">
                        {data.recentEvents.length === 0 ? (
                            <p className="text-white/30 text-sm">No events yet.</p>
                        ) : (
                            <div className="space-y-2">
                                {data.recentEvents.slice(0, 8).map((evt, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                        <span className="text-xs text-white/60 truncate">{evt.action}</span>
                                        <span className="text-xs text-white/20 ml-auto flex-shrink-0">
                                            {new Date(evt.createdAt).toLocaleTimeString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </GlassCard>

                </div>
            )}
        </main>
    );
}
