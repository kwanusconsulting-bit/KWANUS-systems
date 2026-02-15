export const dynamic = "force-dynamic";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-16 space-y-16">
            <header className="text-center space-y-4">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-300/80">
                    ACCESS PARAMETERS
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
                    Simple, focused access.
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    We believe in clarity. No hidden tiers, no complex matrices. Just one powerful OS.
                </p>
            </header>

            <div className="max-w-md mx-auto rounded-3xl border border-cyan-500/30 bg-slate-900/50 p-8 md:p-12 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                        Professional
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold text-white">$99</span>
                        <span className="text-slate-400">/mo</span>
                    </div>
                    <p className="text-sm text-slate-400">Full KWANUS OS Access</p>
                </div>

                <ul className="space-y-4 text-sm text-slate-300">
                    {[
                        "Unlimited Credit Item tracking",
                        "Advanced Dispute Round management",
                        "Full Funding Pipeline tools",
                        "Emotional Resonance Visuals",
                        "Timeline & Relational Identity",
                        "Priority Support from the Stewards"
                    ].map((feat, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <span className="text-emerald-400">✓</span>
                            {feat}
                        </li>
                    ))}
                </ul>

                <Link
                    href="/sign-up"
                    className="block w-full rounded-full bg-cyan-400 py-4 text-center text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-300 transition"
                >
                    Begin Initialization
                </Link>

                <p className="text-center text-[11px] text-slate-500">
                    Cancel anytime. The OS respects your choice.
                </p>
            </div>

            <section className="text-center space-y-6 pt-10 border-t border-slate-800">
                <h2 className="text-xl font-medium">Enterprise or Team access?</h2>
                <p className="text-sm text-slate-400">
                    Need multiple seats for your consultancy? Contact our stewards for a custom configuration.
                </p>
                <Link href="/contact" className="inline-block text-cyan-400 text-sm hover:underline">
                    Contact Stewardship →
                </Link>
            </section>
        </div>
    );
}
