import Link from "next/link";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white selection:bg-indigo-500/30">
            {/* Nav */}
            <nav className="border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="font-bold tracking-tight flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" />
                        KWANUS OS
                    </div>
                    <div className="flex items-center gap-6 text-sm font-medium">
                        <Link href="/onboarding" className="text-white/60 hover:text-white transition">Sign In</Link>
                        <Link href="/onboarding" className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex flex-col items-center justify-center pt-20 pb-32 px-4">
                {/* Hero */}
                <section className="text-center max-w-4xl mx-auto mb-32">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        System Operational • v1.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                        The Operating System<br />for Credit Engineering
                    </h1>
                    <p className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Automate the dispute process. Optimize your funding readiness.<br />
                        Consulting-grade intelligence, built for you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/onboarding" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition w-full sm:w-auto flex items-center justify-center gap-2">
                            Initialize System <span className="text-black/40">→</span>
                        </Link>
                        <Link href="/transparency" className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition w-full sm:w-auto">
                            How it Works
                        </Link>
                    </div>
                </section>

                {/* Pricing */}
                <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className="p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col">
                        <h3 className="text-xl font-semibold mb-2">Starter</h3>
                        <p className="text-white/50 text-sm mb-6">Essential monitoring and manual tools.</p>
                        <div className="text-4xl font-bold mb-8">$29<span className="text-sm font-normal text-white/40">/mo</span></div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {["Monthly Credit Audit", "Basic Dispute Templates", "Funding Readiness Score", "Manual Motherboard Runs"].map((f, i) => (
                                <li key={i} className="flex gap-3 text-sm text-white/70">
                                    <span className="text-indigo-400">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/onboarding" className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-center font-medium transition">
                            Get Started
                        </Link>
                    </div>

                    <div className="p-8 rounded-3xl border border-indigo-500/30 bg-indigo-500/5 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
                        <h3 className="text-xl font-semibold mb-2 text-indigo-300">Pro</h3>
                        <p className="text-white/50 text-sm mb-6">Full automation and strategy engine.</p>
                        <div className="text-4xl font-bold mb-8">$99<span className="text-sm font-normal text-white/40">/mo</span></div>
                        <ul className="space-y-4 mb-8 flex-grow">
                            {["Weekly Auto-Analysis", "ML-Powered Strategy", "Unlimited Disputes", "Priority Processing", "Funding Simulator"].map((f, i) => (
                                <li key={i} className="flex gap-3 text-sm text-white/90">
                                    <span className="text-indigo-400">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/onboarding" className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-center font-medium transition shadow-lg shadow-indigo-500/20">
                            Get Started
                        </Link>
                    </div>
                </section>

                <footer className="w-full max-w-6xl border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/30">
                    <div>© 2026 KWANUS Systems LLC</div>
                    <div className="flex gap-6">
                        <Link href="/transparency" className="hover:text-white transition">Transparency & Rights</Link>
                        <Link href="#" className="hover:text-white transition">Terms</Link>
                        <Link href="#" className="hover:text-white transition">Privacy</Link>
                    </div>
                </footer>
            </div>
        </main>
    );
}
