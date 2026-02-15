// app/page.tsx
import React from "react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            {/* Glow background */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_55%)]" />
            </div>

            {/* Top nav */}
            <header className="w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-sky-500 shadow-lg shadow-emerald-500/40" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-xs font-semibold tracking-[0.2em] text-emerald-300/80">
                                KWANUS
                            </span>
                            <span className="text-[0.7rem] text-slate-400">
                                Emotionally Intelligent Credit OS
                            </span>
                        </div>
                    </div>

                    <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
                        <button className="hover:text-emerald-300 transition-colors">
                            Features
                        </button>
                        <button className="hover:text-emerald-300 transition-colors">
                            Pricing
                        </button>
                        <button className="hover:text-emerald-300 transition-colors">
                            About
                        </button>
                        <button className="hover:text-emerald-300 transition-colors">
                            Contact
                        </button>
                    </nav>

                    <div className="flex items-center gap-3">
                        <button className="rounded-full border border-slate-600/70 px-4 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-400/80 hover:text-emerald-200 transition-colors">
                            Sign in
                        </button>
                        <button className="rounded-full bg-gradient-to-tr from-emerald-400 via-cyan-400 to-sky-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 transition">
                            Get started
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero + snapshot */}
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-10 md:flex-row md:items-center">
                {/* Left: copy */}
                <section className="flex-1 space-y-6">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-emerald-300/80">
                        Emotionally Intelligent Credit Operating System
                    </p>

                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
                        Not a dashboard.
                        <span className="block bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                            A living OS for your credit and emotions.
                        </span>
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                        KWANUS turns your credit, disputes, funding, and identity into a
                        single emotionally aware operating system—so you always know what’s
                        next, without overwhelm, chaos, or guesswork.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button className="rounded-full bg-slate-50 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-slate-200 transition">
                            Enter the OS
                        </button>
                        <button className="rounded-full border border-slate-600/70 px-5 py-2 text-xs font-medium text-slate-200 hover:border-emerald-400/80 hover:text-emerald-200 transition">
                            Explore how it works →
                        </button>
                    </div>

                    <div className="grid gap-4 pt-4 text-xs text-slate-300 sm:grid-cols-3">
                        <div className="space-y-1">
                            <p className="font-semibold text-slate-100">Emotional Intelligence</p>
                            <p className="text-[0.7rem] text-slate-400">
                                Your emotional state is part of the system. The OS adapts tone,
                                visuals, and pacing to where you actually are.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-slate-100">Unified Credit Story</p>
                            <p className="text-[0.7rem] text-slate-400">
                                Credit items, disputes, and funding apps live in one coherent
                                timeline—no more scattered portals.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-slate-100">Guided, Not Overwhelming</p>
                            <p className="text-[0.7rem] text-slate-400">
                                The OS surfaces the next right action instead of dumping
                                everything on you at once.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Right: Live OS Snapshot card */}
                <section className="flex-1">
                    <div className="relative">
                        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-emerald-400/40 via-cyan-400/30 to-sky-500/40 opacity-70 blur-xl" />
                        <div className="relative rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-emerald-500/30 backdrop-blur-2xl">
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-300/80">
                                        Live OS Snapshot
                                    </p>
                                    <p className="text-xs text-slate-300">
                                        Your credit, disputes, and funding in one emotional timeline.
                                    </p>
                                </div>
                                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[0.65rem] font-medium text-emerald-200 border border-emerald-400/40">
                                    KWANUS OS • Steady &amp; Clear
                                </span>
                            </div>

                            <div className="mt-5 grid gap-4 text-xs text-slate-200 sm:grid-cols-2">
                                <div className="space-y-1 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                                        Emotional State
                                    </p>
                                    <p className="text-sm font-semibold text-emerald-300">
                                        Steady &amp; Clear
                                    </p>
                                    <p className="text-[0.7rem] text-slate-400">
                                        OS pacing is gentle, focused.
                                    </p>
                                </div>

                                <div className="space-y-1 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                                        Credit Items
                                    </p>
                                    <p className="text-sm font-semibold text-slate-50">12</p>
                                    <p className="text-[0.7rem] text-slate-400">
                                        Tracked across bureaus.
                                    </p>
                                </div>

                                <div className="space-y-1 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                                        Open Disputes
                                    </p>
                                    <p className="text-sm font-semibold text-amber-300">3</p>
                                    <p className="text-[0.7rem] text-slate-400">
                                        In active motion.
                                    </p>
                                </div>

                                <div className="space-y-1 rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-400">
                                        Funding Apps
                                    </p>
                                    <p className="text-sm font-semibold text-cyan-300">2</p>
                                    <p className="text-[0.7rem] text-slate-400">
                                        In review, emotionally paced.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-3">
                                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-emerald-300/90">
                                    Today’s focus
                                </p>
                                <p className="text-xs font-medium text-slate-50">
                                    Stabilize → Move one calm step forward.
                                </p>
                                <p className="text-[0.7rem] text-slate-300">
                                    The OS has already accounted for your disputes, funding, and
                                    emotional state. You don’t have to hold everything in your
                                    head—just follow the next right action.
                                </p>
                            </div>

                            <div className="mt-4 flex items-center justify-between text-[0.65rem] text-slate-500">
                                <span>Not a dashboard. A living operating system.</span>
                                <span className="text-slate-400">© 2026 KWANUS Systems LLC</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
