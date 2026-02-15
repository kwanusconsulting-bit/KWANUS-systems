// app/page.tsx
export const dynamic = "force-dynamic";
import Link from "next/link";
import MarketingLayout from "./marketing-layout";

function GlassPanel({
    title,
    value,
    subtitle,
}: {
    title: string;
    value: string;
    subtitle?: string;
}) {
    return (
        <div className="flex flex-col gap-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.9)]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                {title}
            </span>
            <span className="text-lg font-semibold text-slate-50">{value}</span>
            {subtitle && (
                <span className="text-xs text-slate-400">{subtitle}</span>
            )}
        </div>
    );
}

export default function HomePage() {
    return (
        <MarketingLayout>
            <section className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
                {/* Left: Story */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-200">
                        Emotionally Intelligent Credit Operating System
                    </div>

                    <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
                        Not a dashboard.
                        <span className="block text-emerald-300">
                            A living OS for your credit and emotions.
                        </span>
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                        KWANUS turns your credit, disputes, funding, and identity into a single
                        emotionally aware operating system—so you always know what&apos;s next,
                        without overwhelm, chaos, or guesswork.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/sign-up"
                            className="rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-[0_0_40px_rgba(52,211,153,0.7)] hover:bg-emerald-300 transition-colors"
                        >
                            Enter the OS
                        </Link>
                        <Link
                            href="/features"
                            className="text-sm text-slate-200 underline-offset-4 hover:underline"
                        >
                            Explore how it works →
                        </Link>
                    </div>

                    <div className="mt-4 grid gap-4 text-xs text-slate-400 sm:grid-cols-3">
                        <div>
                            <div className="text-slate-200">Emotional Intelligence</div>
                            <p className="mt-1">
                                Your emotional state is part of the system. The OS adapts tone,
                                visuals, and pacing to where you actually are.
                            </p>
                        </div>
                        <div>
                            <div className="text-slate-200">Unified Credit Story</div>
                            <p className="mt-1">
                                Credit items, disputes, and funding apps live in one coherent
                                timeline—no more scattered portals.
                            </p>
                        </div>
                        <div>
                            <div className="text-slate-200">Guided, Not Overwhelming</div>
                            <p className="mt-1">
                                The OS surfaces the next right action instead of dumping everything
                                on you at once.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: OS Snapshot */}
                <div className="relative">
                    <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[40px] bg-emerald-400/10 blur-3xl" />
                    <div className="rounded-[32px] border border-white/15 bg-slate-900/70 p-5 backdrop-blur-2xl shadow-[0_0_60px_rgba(15,23,42,1)]">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                                    Live OS Snapshot
                                </span>
                                <span className="text-sm text-slate-200">
                                    Emotionally Intelligent Credit Universe
                                </span>
                            </div>
                            <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                                Emotional State: Steady &amp; Clear
                            </span>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <GlassPanel title="Credit Items" value="12" subtitle="Tracked across bureaus" />
                            <GlassPanel title="Open Disputes" value="3" subtitle="In active motion" />
                            <GlassPanel title="Funding Apps" value="2" subtitle="In review" />
                            <GlassPanel title="Next Action" value="Review dispute letter draft" subtitle="Today's focus: one calm step" />
                        </div>

                        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-xs text-slate-300">
                            <div className="flex items-center justify-between gap-2">
                                <span className="font-medium text-slate-100">
                                    Today&apos;s focus
                                </span>
                                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-200">
                                    Stabilize → Move one step forward
                                </span>
                            </div>
                            <p className="mt-2">
                                The OS has already accounted for your disputes, funding, and
                                emotional state. You don&apos;t have to hold everything in your head—
                                just follow the next right action.
                            </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                            <span>Not a dashboard. A living operating system.</span>
                            <span className="text-slate-500">
                                Powered by emotional intelligence, not just data.
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
