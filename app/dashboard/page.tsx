// app/dashboard/page.tsx
import Link from "next/link";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Background glow */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 left-10 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
                <div className="absolute top-40 right-0 h-96 w-96 rounded-full bg-sky-500/25 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl" />
            </div>

            <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-xl bg-emerald-400/20 border border-emerald-400/40 flex items-center justify-center text-xs font-semibold tracking-[0.2em] uppercase">
                            OS
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-semibold tracking-[0.25em] uppercase text-slate-200">
                                KWANUS
                            </span>
                            <span className="text-[11px] text-slate-400">
                                Live Emotional Credit OS
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>Emotional State: Steady &amp; Clear</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                    </div>
                </div>
            </header>

            <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:py-10">
                {/* Top row: OS snapshot */}
                <section className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                    <div className="rounded-[28px] border border-white/15 bg-slate-900/70 p-5 backdrop-blur-2xl shadow-[0_0_60px_rgba(15,23,42,1)]">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    Live OS Snapshot
                                </p>
                                <p className="mt-1 text-sm text-slate-200">
                                    Your credit, disputes, and funding in one emotional timeline.
                                </p>
                            </div>
                            <Link
                                href="/settings"
                                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200 hover:bg-white/10"
                            >
                                Settings
                            </Link>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    Emotional State
                                </p>
                                <p className="mt-1 text-sm font-semibold text-emerald-300">
                                    Steady &amp; Clear
                                </p>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    OS pacing is gentle, focused.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    Credit Items
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-50">12</p>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    All tracked across bureaus.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    Open Disputes
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-50">3</p>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    In active motion.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-xs">
                                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    Funding Apps
                                </p>
                                <p className="mt-1 text-sm font-semibold text-slate-50">2</p>
                                <p className="mt-1 text-[11px] text-slate-400">
                                    Awaiting decisions.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-xs text-slate-300">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-medium text-slate-100">
                                    Next right action
                                </span>
                                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-200">
                                    Today: Stabilize → One calm move
                                </span>
                            </div>
                            <p className="mt-2">
                                Review your dispute letter draft for Account #4321. The OS has
                                already tracked the bureaus, dates, and documents—you only need
                                to confirm and send.
                            </p>
                        </div>
                    </div>

                    {/* Right: Timeline / notifications */}
                    <div className="space-y-3">
                        <div className="rounded-2xl border border-white/15 bg-slate-900/70 p-4 backdrop-blur-2xl">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                Timeline
                            </p>
                            <ul className="mt-3 space-y-2 text-xs text-slate-300">
                                <li>
                                    <span className="text-slate-100">2h ago</span> — Emotional state
                                    updated to <span className="text-emerald-300">Steady &amp; Clear</span>.
                                </li>
                                <li>
                                    <span className="text-slate-100">Yesterday</span> — Dispute created
                                    for Experian collection.
                                </li>
                                <li>
                                    <span className="text-slate-100">2 days ago</span> — Funding
                                    application submitted to Community Lender.
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-slate-900/70 p-4 backdrop-blur-2xl text-xs text-slate-300">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                Emotional Notes
                            </p>
                            <p className="mt-2">
                                You told the OS you feel cautious but ready. We&apos;re keeping
                                today&apos;s surface area small on purpose.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
