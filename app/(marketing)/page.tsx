export const dynamic = "force-dynamic";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-24 space-y-24">
            {/* Hero */}
            <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
                <div className="space-y-6">
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-300/80">
                        EMOTIONALLY INTELLIGENT CREDIT OPERATING SYSTEM
                    </p>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
                        A living OS for your credit, emotions, and financial decisions.
                    </h1>
                    <p className="text-sm md:text-base text-slate-300 max-w-xl">
                        KWANUS turns your credit, disputes, funding, and identity into a single
                        emotionally aware operating system—so you always know what&apos;s next,
                        without overwhelm, chaos, or guesswork.
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/sign-up"
                            className="rounded-full bg-cyan-400 px-6 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300 transition"
                        >
                            Enter the OS
                        </Link>
                        <Link
                            href="/features"
                            className="text-sm text-slate-300 hover:text-cyan-300 transition"
                        >
                            Explore how it works →
                        </Link>
                    </div>

                    <div className="flex flex-wrap gap-4 text-[11px] text-slate-400">
                        <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Live emotional state engine
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            Disputes, funding, credit items in one place
                        </span>
                        <span className="inline-flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                            Timeline, notifications, documents, settings
                        </span>
                    </div>
                </div>

                {/* Techno‑mythic visual */}
                <div className="relative">
                    <div className="absolute -inset-10 bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 blur-3xl" />
                    <div className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-[0_0_80px_rgba(34,211,238,0.25)]">
                        <div className="text-[11px] uppercase tracking-[0.25em] text-slate-400 mb-3">
                            Live OS Snapshot
                        </div>
                        <div className="space-y-3 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-300">Emotional State</span>
                                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-emerald-300">
                                    Steady & Clear
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <Metric label="Credit Items" value="12" />
                                <Metric label="Open Disputes" value="3" />
                                <Metric label="Funding Apps" value="2" />
                            </div>
                            <div className="mt-3 border-t border-slate-800 pt-3 space-y-1">
                                <Row label="Next action" value="Review dispute letter draft" />
                                <Row label="Last change" value="Emotional state updated 2h ago" />
                                <Row label="Today’s focus" value="Stabilize, then move one step forward." />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Three core pillars */}
            <section className="space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
                    Not a dashboard. A living operating system.
                </h2>
                <p className="text-sm text-slate-300 max-w-2xl">
                    KWANUS doesn’t just track your credit—it understands your emotional state,
                    remembers your actions, and guides your next move with clarity and care.
                </p>

                <div className="grid gap-5 md:grid-cols-3 text-sm">
                    <Pillar
                        title="Emotional Intelligence"
                        body="Your emotional state is part of the system. The OS adapts its tone, visuals, and pacing to match where you are, not where a spreadsheet thinks you should be."
                    />
                    <Pillar
                        title="Credit, Disputes, Funding—Unified"
                        body="Every credit item, dispute, and funding application lives in one place, with a timeline, notifications, and documents that keep the story coherent."
                    />
                    <Pillar
                        title="Guided, Not Overwhelming"
                        body="You always know what’s next. The OS surfaces the next right action instead of dumping everything on you at once."
                    />
                </div>
            </section>

            {/* CTA strip */}
            <section className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-2">
                    <p className="text-xs font-medium tracking-[0.25em] uppercase text-cyan-300/80">
                        READY WHEN YOU ARE
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold text-slate-50">
                        Step into a calmer, clearer credit universe.
                    </h3>
                    <p className="text-sm text-slate-300 max-w-xl">
                        Create your account, answer a few gentle questions, and let the OS build
                        a living picture of your credit, disputes, funding, and emotional state.
                    </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <Link
                        href="/sign-up"
                        className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/40 hover:bg-cyan-300 transition"
                    >
                        Get started in minutes
                    </Link>
                    <span className="text-[11px] text-slate-400">
                        No pressure. The OS moves at your pace.
                    </span>
                </div>
            </section>
        </div>
    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
            <p className="text-[10px] text-slate-400">{label}</p>
            <p className="text-sm font-semibold text-slate-50 mt-0.5">{value}</p>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] text-slate-400">{label}</span>
            <span className="text-[11px] text-slate-200 text-right">{value}</span>
        </div>
    );
}

function Pillar({ title, body }: { title: string; body: string }) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{body}</p>
        </div>
    );
}
