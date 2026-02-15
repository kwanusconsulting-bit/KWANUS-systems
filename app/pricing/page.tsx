// app/pricing/page.tsx
import MarketingLayout from "../marketing-layout";

export default function PricingPage() {
    return (
        <MarketingLayout>
            <section className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
                    Pricing that respects your nervous system.
                </h1>
                <p className="max-w-2xl text-sm text-slate-300">
                    No surprise fees. No hidden penalties. Just clear tiers that match where
                    you are in your credit journey—and where you&apos;re ready to go next.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
                        <h2 className="text-sm font-semibold text-slate-50">Steady</h2>
                        <p className="mt-1 text-xs text-slate-400">
                            For grounding and getting oriented.
                        </p>
                        <p className="mt-4 text-2xl font-semibold text-slate-50">$X/mo</p>
                        <ul className="mt-4 space-y-2 text-xs text-slate-300">
                            <li>Emotional state tracking</li>
                            <li>Credit item overview</li>
                            <li>Gentle next‑step prompts</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/60 bg-emerald-400/10 p-5 backdrop-blur-xl shadow-[0_0_40px_rgba(52,211,153,0.5)]">
                        <h2 className="text-sm font-semibold text-emerald-100">
                            Progressing
                        </h2>
                        <p className="mt-1 text-xs text-emerald-100/80">
                            For active dispute and funding motion.
                        </p>
                        <p className="mt-4 text-2xl font-semibold text-emerald-50">$Y/mo</p>
                        <ul className="mt-4 space-y-2 text-xs text-emerald-50/90">
                            <li>Dispute orchestration</li>
                            <li>Funding application tracking</li>
                            <li>Priority next‑action guidance</li>
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl">
                        <h2 className="text-sm font-semibold text-slate-50">Thriving</h2>
                        <p className="mt-1 text-xs text-slate-400">
                            For long‑term stewardship and expansion.
                        </p>
                        <p className="mt-4 text-2xl font-semibold text-slate-50">$Z/mo</p>
                        <ul className="mt-4 space-y-2 text-xs text-slate-300">
                            <li>Long‑term credit strategy</li>
                            <li>Funding ecosystem mapping</li>
                            <li>Deep emotional‑OS integration</li>
                        </ul>
                    </div>
                </div>
            </section>
        </MarketingLayout>
    );
}
