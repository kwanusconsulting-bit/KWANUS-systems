import MarketingLayout from "../marketing-layout";

export default function AboutPage() {
    return (
        <MarketingLayout>
            <div className="mx-auto max-w-4xl px-4 py-16 space-y-16">
                <header className="space-y-4">
                    <p className="text-xs font-medium tracking-[0.3em] uppercase text-cyan-300/80">
                        OUR ORIGIN
                    </p>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-50">
                        A Stewardship of data and intent.
                    </h1>
                </header>

                <div className="prose prose-invert prose-slate max-w-none text-slate-300 space-y-8 leading-relaxed">
                    <p className="text-lg">
                        KWANUS was born from a simple realization: your financial life is more than a list of accounts. It is a story of choices, momentum, and emotional resonance.
                    </p>

                    <p>
                        Most credit tools treat you like a line on a spreadsheet. They dump data, trigger dopamine with arbitrary scores, and leave you to navigate the chaos alone. KWANUS is different. We built an **Operating System** that understands the human at the center.
                    </p>

                    <div className="grid gap-10 md:grid-cols-2 not-prose py-10">
                        <div className="space-y-3">
                            <h3 className="text-white font-semibold">The Steward Paradox</h3>
                            <p className="text-sm text-slate-400">
                                We guide by being guided. The OS is a mirror of your intent, evolving as you interact with it.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-white font-semibold">Techno-Mythic Roots</h3>
                            <p className="text-sm text-slate-400">
                                We combine the precision of modern data architecture with the ancient wisdom of narrative and momentum.
                            </p>
                        </div>
                    </div>

                    <p>
                        Our mission is to provide the tools you need to stabilize your credit field, reclaim your financial narrative, and move forward with absolute clarity.
                    </p>

                    <p className="italic border-l-2 border-cyan-400 pl-6 py-2">
                        &quot;The steward shapes the field, and the field reflects the steward.&quot;
                    </p>
                </div>
            </div>
        </MarketingLayout>
    );
}
