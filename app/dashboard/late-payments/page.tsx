// app/dashboard/late-payments/page.tsx
import React from "react";

export default function LatePaymentsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-slate-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-500/25 blur-[120px]" />
            </div>

            <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-50 mb-10">
                Late Payments
            </h1>

            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                {/* Ongoing Dispute Card */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-slate-400/30 via-slate-500/20 to-slate-600/20 blur-xl opacity-60 -z-10" />

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300/80">
                        Ongoing Dispute
                    </p>

                    <p className="mt-2 text-sm text-slate-400">May 2029</p>

                    {/* Emotional Impact Slider */}
                    <div className="mt-6">
                        <p className="text-xs text-slate-400 mb-2">Emotional Impact</p>
                        <div className="flex items-center justify-between text-[0.65rem] text-slate-500 mb-2">
                            <span>Low</span>
                            <span>Moderate</span>
                            <span>High</span>
                        </div>

                        <div className="relative h-2 w-full rounded-full bg-slate-700/40">
                            <div className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-slate-300 shadow-md shadow-slate-400/40" />
                        </div>
                    </div>

                    <button className="mt-6 w-full rounded-full bg-slate-700/60 border border-white/10 px-6 py-2 text-xs font-semibold text-slate-200 shadow-inner shadow-black/40 hover:bg-slate-600/60 transition">
                        Open Dispute
                    </button>

                    <p className="mt-4 text-[0.65rem] text-slate-500 text-center">
                        Insights from Himalaya
                    </p>
                </div>

                {/* Glowing Repair Card */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-amber-400/40 via-orange-400/30 to-rose-500/40 blur-xl opacity-60 -z-10" />

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/80">
                        Glowing Repair
                    </p>

                    <p className="mt-2 text-sm text-slate-400">May 2052</p>

                    {/* Emotional Impact Slider */}
                    <div className="mt-6">
                        <p className="text-xs text-slate-400 mb-2">Emotional Impact</p>
                        <div className="flex items-center justify-between text-[0.65rem] text-slate-500 mb-2">
                            <span>Low</span>
                            <span>Moderate</span>
                            <span>High</span>
                        </div>

                        <div className="relative h-2 w-full rounded-full bg-amber-500/20">
                            <div className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-amber-300 shadow-md shadow-amber-400/40" />
                        </div>
                    </div>

                    <button className="mt-6 w-full rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-amber-500/40 hover:brightness-110 transition">
                        Open Dispute
                    </button>

                    <p className="mt-4 text-[0.65rem] text-slate-500 text-center">
                        Insights from Himalaya
                    </p>
                </div>
            </div>
        </main>
    );
}
