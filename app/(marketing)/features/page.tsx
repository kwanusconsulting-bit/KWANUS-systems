export const dynamic = "force-dynamic";
import Link from "next/link";

export default function FeaturesPage() {
    const features = [
        {
            title: "Credit Item Management",
            description: "A centralized vault for every account. Track balances, limits, and status with absolute clarity.",
            icon: "💳"
        },
        {
            title: "Dispute Engineering",
            description: "Systematic challenges to inaccurate data. Build your case with structured rounds and automated evidence tracking.",
            icon: "🏹"
        },
        {
            title: "Funding Pipeline",
            description: "Bridge the gap between credit repair and capital. Monitor your readiness for cards, loans, and business lines.",
            icon: "🚀"
        },
        {
            title: "Emotional Intelligence Engine",
            description: "The OS senses your momentum. Visuals and tone adapt to your state—whether you're thriving or needing focus.",
            icon: "≋"
        },
        {
            title: "Universal Timeline",
            description: "Every action, every letter, every decision—memorialized in a chronological history of your credit evolution.",
            icon: "∞"
        },
        {
            title: "Relational Identity",
            description: "Build a digital profile that reflects your financial lineage and personal intent.",
            icon: "👤"
        }
    ];

    return (
        <div className="mx-auto max-w-6xl px-4 py-16 space-y-20">
            <header className="max-w-3xl space-y-4">
                <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-300/80">
                    SYSTEM CAPABILITIES
                </p>
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
                    Modules designed for resonance and results.
                </h1>
                <p className="text-slate-400">
                    KWANUS is built as a series of integrated modules that work together to stabilize your financial field.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => (
                    <div key={i} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-8 space-y-4 hover:border-cyan-500/30 transition-all group">
                        <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{f.icon}</div>
                        <h3 className="text-lg font-semibold text-slate-100">{f.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
                    </div>
                ))}
            </div>

            <section className="rounded-3xl border border-white/5 bg-white/5 p-10 text-center space-y-6">
                <h2 className="text-2xl font-semibold">Ready to see the OS in action?</h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Start your journey today. The first step is simply arriving.
                </p>
                <Link
                    href="/sign-up"
                    className="inline-block rounded-full bg-slate-100 px-8 py-3 text-sm font-medium text-slate-950 hover:bg-white transition"
                >
                    Initialize Account
                </Link>
            </section>
        </div>
    );
}
