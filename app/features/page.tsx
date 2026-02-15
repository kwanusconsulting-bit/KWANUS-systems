// app/features/page.tsx
import MarketingLayout from "../marketing-layout";

export default function FeaturesPage() {
    return (
        <MarketingLayout>
            <section className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                    Features built for emotional clarity, not chaos.
                </h1>
                <p className="max-w-2xl text-sm text-slate-300">
                    KWANUS OS is a living system that tracks your credit, disputes, funding,
                    and emotional state in one coherent universe—so you always know what
                    matters now, what can wait, and what&apos;s already handled.
                </p>

                <div className="mt-4 grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <h2 className="text-sm font-semibold text-slate-50">
                            Emotional State Engine
                        </h2>
                        <p className="mt-2 text-xs text-slate-300">
                            The OS tracks your emotional state over time and adjusts pacing,
                            language, and focus so you never feel rushed or shamed.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <h2 className="text-sm font-semibold text-slate-50">
                            Unified Credit Story
                        </h2>
                        <p className="mt-2 text-xs text-slate-300">
                            Every credit item, dispute, and funding app lives in one timeline,
                            with documents, notes, and outcomes attached.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                        <h2 className="text-sm font-semibold text-slate-50">
                            Next‑Action Guidance
                        </h2>
                        <p className="mt-2 text-xs text-slate-300">
                            Instead of a wall of data, the OS surfaces the next right action,
                            with context and emotional framing.
                        </p>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
