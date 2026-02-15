export const dynamic = "force-dynamic";
import { mockCreditItems, mockEmotionalState } from "@/lib/data/mock";

export default function CreditHub() {
    return (
        <main className="min-h-screen bg-background text-foreground p-8 space-y-8 k-mode-progress">
            <header className="pb-8 border-b border-white/5">
                <h1 className="text-5xl font-black tracking-tighter uppercase italic k-accent">CREDIT HUB</h1>
                <p className="text-sm font-bold tracking-[0.3em] uppercase opacity-40">Financial Sovereignty Sequence</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* SCORE GAUGE (MOMENTUM) */}
                <div className="lg:col-span-2 k-glass-panel p-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />

                    <div className="relative w-64 h-64 flex items-center justify-center rounded-full border-2 border-white/5 shadow-2xl">
                        <div className="absolute inset-4 rounded-full border border-indigo-500/20 animate-spin-slow" />
                        <div className="text-center">
                            <div className="text-7xl font-black tracking-tighter italic k-accent">742</div>
                            <div className="text-xs font-black uppercase tracking-[0.4em] opacity-40">RELIANCE</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 w-full gap-4 max-w-xl">
                        {[
                            { label: "Stability", val: "High" },
                            { label: "Flow", val: "Steady" },
                            { label: "Memory", val: "Eternal" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-4 bg-white/5 rounded">
                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{stat.label}</div>
                                <div className="text-sm font-black uppercase tracking-tighter">{stat.val}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* EMOTIONAL IMPACT (GRAVITY) */}
                <div className="k-glass-panel p-8 space-y-8">
                    <h2 className="text-xl font-black tracking-tighter uppercase italic">Emotional Resonance</h2>
                    <div className="space-y-6">
                        <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl space-y-2">
                            <div className="text-xs font-bold uppercase tracking-widest opacity-60">System Tone</div>
                            <div className="text-2xl font-black uppercase italic text-indigo-400">{mockEmotionalState.tone}</div>
                            <p className="text-xs text-white/40 leading-relaxed italic">
                                The universe is aligned with your financial intentions.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Recent Transitions</h3>
                            {mockCreditItems.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        item.emotionalImpact === "Positive" ? "bg-emerald-500" : "bg-indigo-500"
                                    )} />
                                    <div className="flex-1">
                                        <div className="text-xs font-black uppercase tracking-widest">{item.type}</div>
                                        <div className="text-[10px] opacity-40 font-bold uppercase">{item.status}</div>
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-tighter opacity-20 italic">2D AGO</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* TIMELINE (LINER TIME) */}
            <section className="k-glass-panel p-8">
                <h2 className="text-xl font-black tracking-tighter uppercase italic mb-8">The Long Story</h2>
                <div className="h-32 flex items-end gap-1 px-4">
                    {Array.from({ length: 48 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex-1 bg-white/10 hover:bg-indigo-500/50 transition-colors rounded-t"
                            style={{ height: `${Math.random() * 100}%` }}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-black uppercase tracking-widest opacity-20">
                    <span>Creation</span>
                    <span>Evolution</span>
                    <span>Continuity</span>
                </div>
            </section>
        </main>
    );
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
