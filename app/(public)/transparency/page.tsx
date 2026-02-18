import Link from "next/link";

export default function TransparencyPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white p-8 md:p-20">
            <div className="max-w-3xl mx-auto space-y-12">
                <header>
                    <Link href="/" className="text-sm text-white/40 hover:text-white mb-8 block">← Back to Home</Link>
                    <h1 className="text-4xl font-bold mb-4">Transparency & Consumer Rights</h1>
                    <p className="text-xl text-white/60">How KWANUS Systems LLC operates, makes money, and protects you.</p>
                </header>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white/90">1. We Are A Software Tool, Not A Law Firm</h2>
                    <p className="text-white/60 leading-relaxed">
                        KWANUS is a self-service software platform. We provide educational templates, organization tools, and automated workflows. We do not provide legal advice, and we do not represent you in court or to credit bureaus. You retain full control over every letter generated and sent.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white/90">2. No Guarantees</h2>
                    <p className="text-white/60 leading-relaxed">
                        Credit repair is a variable process. No software or company can legally guarantee the removal of accurate, verifiable negative items. "Deletion Probability" scores are statistical estimates based on historical data, not promises of future results.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white/90">3. Business Model Declaration</h2>
                    <p className="text-white/60 leading-relaxed">
                        We make money solely through transparent monthly subscriptions (Starter & Pro).
                        <br /><br />
                        <span className="text-indigo-400">We do NOT sell your data</span> to lenders, insurance companies, or data brokers. Your financial data is used exclusively to power the tools you use.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white/90">4. Your Right To Cancel</h2>
                    <p className="text-white/60 leading-relaxed">
                        You may cancel your subscription at any time via the Billing portal. Access continues until the end of your billing cycle. You can export your data before leaving.
                    </p>
                </section>

                <footer className="pt-10 border-t border-white/10 text-white/40 text-sm">
                    © 2026 KWANUS Systems LLC. All rights reserved.
                </footer>
            </div>
        </main>
    );
}
