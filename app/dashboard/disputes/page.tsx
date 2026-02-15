// app/dashboard/disputes/page.tsx
import React from "react";

export default function DisputesPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[120px]" />
            </div>

            <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-50 mb-10">
                Disputes
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Dispute 1 — In Motion */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-emerald-400/30 via-cyan-400/20 to-sky-500/20 blur-xl opacity-60 -z-10" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">
                                Experian Collection Dispute
                            </p>
                            <p className="text-xs text-slate-400">Midland Collections • $1,980</p>
                        </div>

                        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[0.65rem] font-medium text-emerald-200 border border-emerald-400/40">
                            In Motion
                        </span>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Submitted 2 days ago • Experian reviewing
                    </p>

                    <button className="mt-4 w-full rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-sky-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 transition">
                        View Details
                    </button>
                </div>

                {/* Dispute 2 — Awaiting Response */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-orange-400/20 to-rose-500/20 blur-xl opacity-60 -z-10" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">
                                Equifax Late Payment Dispute
                            </p>
                            <p className="text-xs text-slate-400">Synchrony Bank • $620</p>
                        </div>

                        <span className="rounded-full bg-amber-400/15 px-3 py-1 text-[0.65rem] font-medium text-amber-200 border border-amber-400/40">
                            Awaiting Response
                        </span>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Submitted 5 days ago • Equifax processing
                    </p>

                    <button className="mt-4 w-full rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-amber-500/40 hover:brightness-110 transition">
                        View Details
                    </button>
                </div>

                {/* Dispute 3 — Resolved */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-slate-400/30 via-slate-500/20 to-slate-600/20 blur-xl opacity-60 -z-10" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">
                                TransUnion Charge-Off Dispute
                            </p>
                            <p className="text-xs text-slate-400">Capital One • $1,240</p>
                        </div>

                        <span className="rounded-full bg-slate-400/15 px-3 py-1 text-[0.65rem] font-medium text-slate-200 border border-slate-400/40">
                            Resolved
                        </span>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Resolved 1 week ago • TransUnion updated
                    </p>

                    <button className="mt-4 w-full rounded-full bg-slate-700/60 border border-white/10 px-6 py-2 text-xs font-semibold text-slate-200 shadow-inner shadow-black/40 hover:bg-slate-600/60 transition">
                        View Outcome
                    </button>
                </div>
            </div>
        </main>
    );
}
