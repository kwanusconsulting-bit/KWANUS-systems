// app/dashboard/funding/page.tsx
import React from "react";

export default function FundingPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 px-6 py-10">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-500/25 blur-[120px]" />
            </div>

            <h1 className="text-center text-2xl font-semibold tracking-tight text-slate-50 mb-10">
                Funding Applications
            </h1>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Funding App 1 — In Review */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-emerald-400/30 via-cyan-400/20 to-sky-500/20 blur-xl opacity-60 -z-10" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">
                                Community Lender
                            </p>
                            <p className="text-xs text-slate-400">Personal Loan • $5,000</p>
                        </div>

                        <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[0.65rem] font-medium text-emerald-200 border border-emerald-400/40">
                            In Review
                        </span>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Submitted 2 days ago • Lender reviewing documents
                    </p>

                    <button className="mt-4 w-full rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-sky-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 transition">
                        View Application
                    </button>
                </div>

                {/* Funding App 2 — Additional Info Needed */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-orange-400/20 to-rose-500/20 blur-xl opacity-60 -z-10" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">
                                Credit Union
                            </p>
                            <p className="text-xs text-slate-400">Auto Loan • $12,000</p>
                        </div>

                        <span className="rounded-full bg-amber-400/15 px-3 py-1 text-[0.65rem] font-medium text-amber-200 border border-amber-400/40">
                            Additional Info Needed
                        </span>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Lender requested updated income verification
                    </p>

                    <button className="mt-4 w-full rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-amber-500/40 hover:brightness-110 transition">
                        Upload Documents
                    </button>
                </div>

                {/* Funding App 3 — Approved */}
                <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur-2xl">
                    <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-sky-400/30 via-blue-400/20 to-indigo-500/20 blur-xl opacity-60 -z-10" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-100">
                                Online Lender
                            </p>
                            <p className="text-xs text-slate-400">Credit Builder Loan • $1,000</p>
                        </div>

                        <span className="rounded-full bg-sky-400/15 px-3 py-1 text-[0.65rem] font-medium text-sky-200 border border-sky-400/40">
                            Approved
                        </span>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Approved 3 days ago • Funds available
                    </p>

                    <button className="mt-4 w-full rounded-full bg-gradient-to-tr from-sky-400 via-blue-400 to-indigo-500 px-6 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40 hover:brightness-110 transition">
                        View Details
                    </button>
                </div>
            </div>
        </main>
    );
}
